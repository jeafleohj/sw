export class PlanetEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly diameter: string,
    public readonly rotationPeriod: string,
    public readonly orbitalPeriod: string,
    public readonly gravity: string,
    public readonly population: string,
    public readonly climate: string,
    public readonly terrain: string,
    public readonly surfaceWater: string,
    public readonly residents: string[],
    public readonly films: string[],
    public readonly url: string,
    public readonly created: string,
    public readonly edited: string,
  ) {}

  static fromObject(data: Partial<PlanetEntity>): PlanetEntity {
    return new PlanetEntity(
      data.id ?? "",
      data.name ?? "",
      data.diameter ?? "",
      data.rotationPeriod ?? "",
      data.orbitalPeriod ?? "",
      data.gravity ?? "",
      data.population ?? "",
      data.climate ?? "",
      data.terrain ?? "",
      data.surfaceWater ?? "",
      data.residents ?? [],
      data.films ?? [],
      data.url ?? "",
      data.created ?? new Date().toISOString(),
      data.edited ?? new Date().toISOString(),
    );
  }
}
