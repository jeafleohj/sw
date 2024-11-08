import { planetSchema } from "@/application/schemas/planetSchema";
import { PlanetEntity } from "@/domain/entities/PlanetEntity";
import { IPlanetRepository } from "@/domain/repositories/IPlanetRepository";
import { IPlanetApiClient } from "@/domain/services/IPlanetApiClient";
import { Context } from "hono";
import { z } from "zod";

const transformPlanet = (planet: PlanetEntity) => ({
  nombre: planet.name,
  diametro: planet.diameter,
  periodoRotacion: planet.rotationPeriod,
  periodoOrbital: planet.orbitalPeriod,
  gravedad: planet.gravity,
  poblacion: planet.population,
  clima: planet.climate,
  terreno: planet.terrain,
  aguaSuperficial: planet.surfaceWater,
  residentes: planet.residents,
  peliculas: planet.films,
  url: planet.url,
  creado: planet.created,
  editado: planet.edited,
});

const mapToPlanetEntityData = (data: z.infer<typeof planetSchema>) => ({
  name: data.nombre,
  diameter: data.diametro,
  rotationPeriod: data.periodoRotacion,
  orbitalPeriod: data.periodoOrbital,
  gravity: data.gravedad,
  population: data.poblacion,
  climate: data.clima,
  terrain: data.terreno,
  surfaceWater: data.aguaSuperficial,
  residents: data.residentes,
  films: data.peliculas,
  url: data.url,
  created: new Date().toISOString(),
  edited: new Date().toISOString(),
});

export const CreatePlanetController = (repository: IPlanetRepository, apiClient: IPlanetApiClient) => ({
  async createPlanet(c: Context) {
    const data = await c.req.json();
    const result = planetSchema.safeParse(data);

    if (!result.success) {
      const errors = result.error.errors.map((err) => err.message);
      return c.json({ error: "Invalid payload", details: errors }, 400);
    }

    const planetData = mapToPlanetEntityData(result.data);

    try {
      const newPlanet = await repository.save(planetData);
      const transformedPlanet = transformPlanet(newPlanet);
      return c.json({ message: "Planet created successfully", id: newPlanet.id, planet: transformedPlanet }, 201);
    } catch (error) {
      console.error("Error creating planet:", error);
      return c.json({ error: "Error creating planet" }, 500);
    }
  },

  async getPlanet(c: Context) {
    const id = c.req.param("id");
    try {
      const planet = await repository.getById(id);
      if (planet) {
        const transformedPlanet = transformPlanet(planet);
        return c.json(transformedPlanet, 200);
      }

      const data = await apiClient.getById(id);

      if (!data) {
        return c.json({ error: "Character not found in external API" }, 404);
      }

      const transformedPerson = transformPlanet(data);

      return c.json(transformedPerson, 200);
    } catch (error) {
      console.error("Error fetching planet:", error);
      return c.json({ error: "Error fetching planet" }, 500);
    }
  },
});
