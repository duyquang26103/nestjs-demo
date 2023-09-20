import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CourseEntity } from './course.entity';

@Entity()
export class QuizEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quizName: string;

  @ManyToOne(() => CourseEntity, (course) => course.quizzes)
  course: CourseEntity;

  @Column('text')
  questions: string;

  @Column()
  passingScore: number;
}
