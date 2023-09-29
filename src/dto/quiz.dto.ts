import { IsString, IsNumber } from 'class-validator';
import { Expose, Type } from "class-transformer";
import { CourseEntity } from "../entities/course.entity";
import { BaseDto } from "../common/base.dto";

export class QuizDto extends BaseDto{
  @Expose()
  @Type(() => CourseEntity)
  course: CourseEntity

  @Expose() // Expose this property
  @IsString()
  quizName: string;

  @Expose() // Expose this property
  @IsString()
  questions: string;

  @Expose() // Expose this property
  @IsNumber()
  passingScore: number;
}