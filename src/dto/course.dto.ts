import { IsString, IsArray, ValidateNested, IsOptional } from "class-validator";
import { Expose, Type } from 'class-transformer'; // Import the Expose decorator
import { UserDto } from './user.dto';
import { CategoryDto } from './category.dto';
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
  @IsString()
  content: string;

  @Expose()
  image: string;

  @Expose() // Expose this property
  @ValidateNested()
  @Type(() => UserDto)
  instructor: UserDto;

  @Expose() // Expose this property
  @ValidateNested()
  @Type(() => CategoryDto)
  category: CategoryDto;

  @Expose() // Expose this property
  @ValidateNested()
  @Type(() => UserDto)
  @IsArray()
  enrollments: UserDto[];

  @Expose() // Expose this property
  @ValidateNested()
  @Type(() => QuizDto)
  @IsArray()
  quizzes: QuizDto[];
}

export class CreateCourseDto extends BaseDto {
  @Expose() // Expose this property
  @IsString()
  courseName: string;

  @Expose() // Expose this property
  @IsString()
  description: string;

  @Expose() // Expose this property
  @IsString()
  content: string;

  @Expose()
  image: any;

  @IsOptional()
  @ValidateNested()
  @Type(() => UserDto)
  instructor: UserDto;

  @ValidateNested()
  @Type(() => CategoryDto)
  category: CategoryDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UserDto)
  @IsArray()
  enrollments: UserDto[];

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
  @IsString()
  content: string;

  @IsOptional()
  @Expose()
  image: string;

  @IsOptional()
  @Expose() // Expose this property
  @ValidateNested()
  @Type(() => UserDto)
  instructor: UserDto;

  @IsOptional()
  @Expose() // Expose this property
  @ValidateNested()
  @Type(() => CategoryDto)
  category: CategoryDto;

  @IsOptional()
  @Expose() // Expose this property
  @ValidateNested()
  @Type(() => UserDto)
  @IsArray()
  enrollments: UserDto[];

  @IsOptional()
  @Expose() // Expose this property
  @ValidateNested()
  @Type(() => QuizDto)
  @IsArray()
  quizzes: QuizDto[];
}
