import { PeopleEntity } from "@/domain/entities/PeopleEntity";
import { IPeopleRepository } from "@/domain/repositories/IPeopleRepository";
import { z } from "zod";

// Define el esquema de validación para People
const PeopleSchema = z.object({
  name: z.string(),
  birthYear: z.string(),
  eyeColor: z.string(),
  gender: z.string(),
  hairColor: z.string(),
  height: z.string(),
  mass: z.string(),
  skinColor: z.string(),
  homeworld: z.string().url(),
  films: z.array(z.string().url()),
  species: z.array(z.string().url()),
  starships: z.array(z.string().url()),
  vehicles: z.array(z.string().url()),
  url: z.string().url(),
  created: z.string().datetime(),
  edited: z.string().datetime(),
});

export class CreatePeopleCommand {
  constructor(private repository: IPeopleRepository) {}

  async execute(data: unknown): Promise<void> {
    const parsedData = PeopleSchema.parse(data);

    const entity = PeopleEntity.fromObject(parsedData);

    await this.repository.save(entity);
  }
}
