import { PeopleEntity } from "@/domain/entities/PeopleEntity";
import { IPeopleRepository } from "@/domain/repositories/IPeopleRepository";

export class GetPeopleQuery {
  constructor(private peopleRepository: IPeopleRepository) {}

  async execute(id: string): Promise<PeopleEntity | null> {
    return this.peopleRepository.getById(id);
  }
}
