import { PlanetEntity } from "@/domain/entities/PlanetEntity";
import { IPlanetRepository } from "@/domain/repositories/IPlanetRepository";
import { z } from "zod";

const PlanetSchema = z.object({
  name: z.string(),
  diameter: z.string(),
  rotationPeriod: z.string(),
  orbitalPeriod: z.string(),
  gravity: z.string(),
  population: z.string(),
  climate: z.string(),
  terrain: z.string(),
  surfaceWater: z.string(),
  residents: z.array(z.string().url()),
  films: z.array(z.string().url()),
  url: z.string().url(),
  created: z.string().datetime(),
  edited: z.string().datetime(),
});

export class CreatePlanetCommand {
  constructor(private repository: IPlanetRepository) {}

  async execute(data: unknown): Promise<void> {
    const parsedData = PlanetSchema.parse(data);

    const entity = PlanetEntity.fromObject(parsedData);

    await this.repository.save(entity);
  }
}
