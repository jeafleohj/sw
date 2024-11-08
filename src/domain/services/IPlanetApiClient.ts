import { PlanetEntity } from "../entities/PlanetEntity";

export interface IPlanetApiClient {
  getById(id: string): Promise<PlanetEntity | null>;
}
