import { Entity, Column, ManyToOne } from 'typeorm';
import { CourseEntity } from './course.entity';
import { BaseEntity } from "../common/mysql/base.entity";

@Entity()
export class QuizEntity extends BaseEntity{
  @Column()
  quizName: string;

  @ManyToOne(() => CourseEntity, (course) => course.quizzes)
  course: CourseEntity;

  @Column('text')
  questions: string;

  @Column()
  passingScore: number;
}
