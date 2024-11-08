export class PeopleEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly birthYear: string,
    public readonly eyeColor: string,
    public readonly gender: string,
    public readonly hairColor: string,
    public readonly height: string,
    public readonly mass: string,
    public readonly skinColor: string,
    public readonly homeworld: string,
    public readonly films: string[],
    public readonly species: string[],
    public readonly starships: string[],
    public readonly vehicles: string[],
    public readonly url: string,
    public readonly created: string,
    public readonly edited: string,
  ) {}

  static fromObject(data: Partial<PeopleEntity>): PeopleEntity {
    return new PeopleEntity(
      data.id ?? "", // default to '' if undefined
      data.name ?? "",
      data.birthYear ?? "",
      data.eyeColor ?? "",
      data.gender ?? "",
      data.hairColor ?? "",
      data.height ?? "",
      data.mass ?? "",
      data.skinColor ?? "",
      data.homeworld ?? "",
      data.films ?? [],
      data.species ?? [],
      data.starships ?? [],
      data.vehicles ?? [],
      data.url ?? "",
      data.created ?? new Date().toISOString(),
      data.edited ?? new Date().toISOString(),
    );
  }
}
