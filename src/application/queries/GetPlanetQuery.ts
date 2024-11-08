import { PlanetEntity } from "@/domain/entities/PlanetEntity";
import { IPlanetRepository } from "@/domain/repositories/IPlanetRepository";

export class GetPlanetQuery {
  constructor(private planetRepository: IPlanetRepository) {}

  async execute(id: string): Promise<PlanetEntity | null> {
    return this.planetRepository.getById(id);
  }
}
