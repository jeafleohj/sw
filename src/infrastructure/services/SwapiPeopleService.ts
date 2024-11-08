import { PeopleEntity } from "@/domain/entities/PeopleEntity";
import { IPeopleApiClient } from "@/domain/services/IPeopleApiClient";

export class SwapiPeopleService implements IPeopleApiClient {
  async getById(id: string): Promise<PeopleEntity | null> {
    const response = await fetch(`https://swapi.py4e.com/api/people/${id}/`);
    if (response.ok) {
      const data = await response.json();
      return PeopleEntity.fromObject(data);
    }
    return null;
  }
}
