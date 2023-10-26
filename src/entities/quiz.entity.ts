import { Entity, Column, ManyToOne } from 'typeorm';
import { CourseEntity } from './course.entity';
import { BaseEntity } from "../common/mysql/base.entity";

@Entity()
export class QuizEntity extends BaseEntity{
  @Column({
    name: 'quiz_name'
  })
  quizName: string;

  @ManyToOne(() => CourseEntity, (course) => course.quizzes)
  course: CourseEntity;

  @Column('text')
  questions: string;

  @Column({
    name: 'passing_core'
  })
  passingScore: number;
}
