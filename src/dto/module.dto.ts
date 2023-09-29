import { IsString, IsNumber } from 'class-validator';
import { Expose, Type } from "class-transformer";
import { CourseEntity } from "../entities/course.entity";
import { BaseDto } from "../common/base.dto"; // Import the Expose decorator

export class ModuleDto extends BaseDto{
  @Expose()
  @Type(() => CourseEntity)
  course: CourseEntity

  @Expose()
  @IsString()
  moduleName: string;

  @Expose()
  @IsString()
  content: string;

  @Expose()
  @IsNumber()
  sequenceNumber: number;
}