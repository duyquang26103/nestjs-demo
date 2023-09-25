import { IsOptional, IsString, ValidateNested } from "class-validator";
import { Expose, Type } from "class-transformer";
import { BaseDto } from "../common/base.dto";
import { CourseDto } from "./course.dto";

export class CategoryDto extends BaseDto{
  @Expose()
  @IsString()
  categoryName: string;

  @IsOptional()
  @Expose()
  @ValidateNested()
  @Type(() => CourseDto)
  courses: CourseDto[];
}
