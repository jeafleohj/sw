import { PeopleEntity } from "@/domain/entities/PeopleEntity";

export interface IPeopleApiClient {
  getById(id: string): Promise<PeopleEntity | null>;
}
