import { PeopleEntity } from "@/domain/entities/PeopleEntity";
import { IRepository } from "@/domain/repositories/IRepository";

export interface IPeopleRepository extends IRepository<PeopleEntity> {}
