import { BaseEntity } from "./base.entity";
import { Repository } from "typeorm";
import { IBaseService } from "./IBase.service";
import { BadGatewayException } from '@nestjs/common';

export class BaseService<T extends BaseEntity> implements IBaseService<T> {
  constructor(protected genericRepository: Repository<T>) {}

  async create(entity: T): Promise<T> {
    try {
      return new Promise<T> ((resolve, reject) => {
        this.genericRepository.save(entity)
          .then(created=> resolve((created)
          ))
          .catch(err => reject(err))
      })
    }
    catch(error) {
      throw new BadGatewayException(error);
    }
  }

  getAll(): Promise<T[]> {
    try {
      return <Promise<T[]>>this.genericRepository.find();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async getById(id: string): Promise<T> {
    try {
      return this.genericRepository.findOneBy({ id : id as any})
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async delete(id: string): Promise<string> {
    try {
      await this.genericRepository.softDelete({ id: id as any });
      return 'success';
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async update(id: string, entity: any): Promise<any>{
    const found = await this.getById(id);
    const newEntity = {...found, ...entity}
    try {
        await this.genericRepository.update({ id: id as any }, { ...newEntity });
        return 'success';
      } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}