export interface IRepository<T extends { id: string }> {
  getById(id: string): Promise<T | null>;
  save(entity: Omit<T, "id">): Promise<T>;
}
