import { IsString, IsNumber } from 'class-validator';
import { Expose, Type } from "class-transformer";
import { CourseEntity } from "../entities/course.entity"; // Import the Expose decorator

export class ModuleDto {
  @Expose() // Expose this property
  id: number;

  @Expose()
  @Type(() => CourseEntity)
  course: CourseEntity

  @Expose() // Expose this property
  @IsString()
  moduleName: string;

  @Expose() // Expose this property
  @IsString()
  content: string;

  @Expose() // Expose this property
  @IsNumber()
  sequenceNumber: number;

  // You can choose to expose or hide other properties as needed
}