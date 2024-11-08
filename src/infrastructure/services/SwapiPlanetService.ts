import { PlanetEntity } from "@/domain/entities/PlanetEntity";
import { IPlanetApiClient } from "@/domain/services/IPlanetApiClient";

export class SwapiPlanetService implements IPlanetApiClient {
  async getById(id: string): Promise<PlanetEntity> {
    const response = await fetch(`https://swapi.py4e.com/api/planets/${id}/`);
    const data = await response.json();

    return PlanetEntity.fromObject(data);
  }
}
