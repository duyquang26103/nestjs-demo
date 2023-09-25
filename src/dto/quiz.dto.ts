import { IsString, IsNumber } from 'class-validator';
import { Expose, Type } from "class-transformer";
import { CourseEntity } from "../entities/course.entity";

export class QuizDto {
  @Expose() // Expose this property
  id: number;

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

  // You can choose to expose or hide other properties as needed
}