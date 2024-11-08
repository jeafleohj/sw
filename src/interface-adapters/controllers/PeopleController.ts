import { peopleSchema } from "@/application/schemas/peopleSchema";
import { PeopleEntity } from "@/domain/entities/PeopleEntity";
import { IPeopleRepository } from "@/domain/repositories/IPeopleRepository";
import { IPeopleApiClient } from "@/domain/services/IPeopleApiClient";
import { Context } from "hono";
import { z } from "zod";

const transformPerson = (people: PeopleEntity) => ({
  nombre: people.name,
  anhoNacimiento: people.birthYear,
  colorOjos: people.eyeColor,
  genero: people.gender,
  colorCabello: people.hairColor,
  altura: people.height,
  masa: people.mass,
  colorPiel: people.skinColor,
  mundoNatal: people.homeworld,
  peliculas: people.films,
  especies: people.species,
  navesEstelares: people.starships,
  vehiculos: people.vehicles,
  url: people.url,
  creado: people.created,
  editado: people.edited,
});

const mapToPeopleEntityData = (data: z.infer<typeof peopleSchema>) => ({
  name: data.nombre,
  birthYear: data.anhoNacimiento,
  eyeColor: data.colorOjos,
  gender: data.genero,
  hairColor: data.colorCabello,
  height: data.altura,
  mass: data.masa,
  skinColor: data.colorPiel,
  homeworld: data.mundoNatal,
  films: data.peliculas,
  species: data.especies,
  starships: data.navesEstelares,
  vehicles: data.vehiculos,
  url: data.url,
  created: new Date().toISOString(),
  edited: new Date().toISOString(),
});

export const CreatePeopleController = (repository: IPeopleRepository, apiClient: IPeopleApiClient) => ({
  async createPerson(c: Context) {
    const raw = await c.req.json();

    const result = peopleSchema.safeParse(raw);

    if (!result.success) {
      const errors = result.error.errors.map((err) => err.message);
      return c.json({ error: "Invalid payload", details: errors }, 400);
    }
    const data = result.data;

    const personData = mapToPeopleEntityData(data);

    try {
      const person = await repository.save(personData);
      const transformedPerson = transformPerson(person);
      return c.json({ message: "Person created successfully", id: person.id, person: transformedPerson }, 201);
    } catch (error) {
      console.error("Error creating person:", error);
      return c.json({ error: "Error creating person" }, 500);
    }
  },

  async getPerson(c: Context) {
    const id = c.req.param("id");

    try {
      const person = await repository.getById(id);

      if (person) {
        const transformedPerson = transformPerson(person);
        return c.json(transformedPerson, 200);
      } else {
        const data = await apiClient.getById(id);

        if (!data) {
          return c.json({ error: "Character not found in external API" }, 404);
        }

        await repository.save(data);

        const transformedPerson = transformPerson(data);

        return c.json(transformedPerson, 200);
      }
    } catch (error) {
      console.error("Error fetching character:", error);
      return c.json({ error: "Error fetching character" }, 500);
    }
  },
});
