import { Expose, plainToInstance } from 'class-transformer';
import { Transform } from 'class-transformer';
export abstract class BaseDto {
  @Expose()
  id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  deletedAt: Date;
  static plainToInstance<T>(this: new (...args: any[]) => T, obj: T): T {
    return plainToInstance(this, obj, {
      excludeExtraneousValues: true,
    });
  }

  static plainToInstanceArray<T>(this: new (...args: any[]) => T, arr: T[]): T[] {
    let validatedList: T[] = [];
    for (const ele of arr) {
      const dataIsValidated = plainToInstance(this, ele, {
        excludeExtraneousValues: true,
      });
      validatedList.push(dataIsValidated);
    }
    return validatedList;
  }
}

export function  Default(defaultValue: any) {
  return Transform((value: any) => (value !== null && value !== undefined ? value : defaultValue));
}
