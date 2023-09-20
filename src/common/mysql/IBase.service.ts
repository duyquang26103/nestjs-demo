export interface IBaseService<T> {

  getAll(): Promise<T[]>;
  get(id: string): Promise<T>;
  update(id: string, entity: T): Promise<T>;
  create(entity: T): Promise<T>;
  delete(id: string): Promise<string>;
}