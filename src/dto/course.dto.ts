// course.dto.ts
import { IsString, IsArray, ValidateNested, IsOptional } from "class-validator";
import { Expose, Type } from 'class-transformer'; // Import the Expose decorator
import { UserDto } from './user.dto';
import { CategoryDto } from './category.dto';
import { EnrollmentDto } from './enrollment.dto';
import { ModuleDto } from './module.dto';
import { QuizDto } from './quiz.dto';
import { BaseDto } from "../common/base.dto";

export class CourseDto extends BaseDto {
  @Expose()
  @IsString()
  courseName: string;

  @Expose()
  @IsString()
  description: string;

  @Expose() // Expose this property
  @ValidateNested()
  @Type(() => UserDto)
  instructorId: UserDto;

  @Expose() // Expose this property
  @ValidateNested()
  @Type(() => CategoryDto)
  category: CategoryDto;

  @Expose() // Expose this property
  @ValidateNested()
  @Type(() => EnrollmentDto)
  @IsArray()
  enrollments: EnrollmentDto[];

  @Expose() // Expose this property
  @ValidateNested()
  @Type(() => ModuleDto)
  @IsArray()
  modules: ModuleDto[];

  @Expose() // Expose this property
  @ValidateNested()
  @Type(() => QuizDto)
  @IsArray()
  quizzes: QuizDto[];
}

export class CreateCourseDto extends BaseDto {
  @IsString()
  courseName: string;

  @IsString()
  description: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UserDto)
  instructorId: UserDto;

  @ValidateNested()
  @Type(() => CategoryDto)
  category: CategoryDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => EnrollmentDto)
  @IsArray()
  enrollments: EnrollmentDto[];

  @IsOptional()
  @Expose()
  @ValidateNested()
  @Type(() => ModuleDto)
  @IsArray()
  modules: ModuleDto[];

  @IsOptional()
  @Expose()
  @ValidateNested()
  @Type(() => QuizDto)
  @IsArray()
  quizzes: QuizDto[];
}

export class editCourseDto extends BaseDto {
  @IsOptional()
  @Expose()
  @IsString()
  courseName: string;

  @IsOptional()
  @Expose()
  @IsString()
  description: string;

  @IsOptional()
  @Expose() // Expose this property
  @ValidateNested()
  @Type(() => UserDto)
  instructorId: UserDto;

  @IsOptional()
  @Expose() // Expose this property
  @ValidateNested()
  @Type(() => CategoryDto)
  category: CategoryDto;

  @IsOptional()
  @Expose() // Expose this property
  @ValidateNested()
  @Type(() => EnrollmentDto)
  @IsArray()
  enrollments: EnrollmentDto[];

  @IsOptional()
  @Expose() // Expose this property
  @ValidateNested()
  @Type(() => ModuleDto)
  @IsArray()
  modules: ModuleDto[];

  @IsOptional()
  @Expose() // Expose this property
  @ValidateNested()
  @Type(() => QuizDto)
  @IsArray()
  quizzes: QuizDto[];
}
