import { Entity, Column, ManyToOne, OneToMany, ManyToMany } from "typeorm";
import { UserEntity } from './user.entity';
import { QuizEntity } from './quiz.entity';
import { CategoryEntity } from './category.entity';
import { BaseEntity } from "../common/mysql/base.entity";
import { JoinTable } from "typeorm";

@Entity()
export class CourseEntity extends BaseEntity{
  @Column({
    name: 'course_name'
  })
  courseName: string;

  @Column('text')
  description: string;

  @Column()
  image: string;

  @Column('text')
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.instructorOf)
  instructor: UserEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.courses)
  category: CategoryEntity;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  enrollments: UserEntity[]

  @OneToMany(() => QuizEntity, (quiz) => quiz.course)
  quizzes: QuizEntity[];
}
