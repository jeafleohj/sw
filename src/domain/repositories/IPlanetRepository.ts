import { PlanetEntity } from "@/domain/entities/PlanetEntity";
import { IRepository } from "@/domain/repositories/IRepository";

export interface IPlanetRepository extends IRepository<PlanetEntity> {}
