import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { EnrollmentEntity } from './enrollment.entity';
import { ModuleEntity } from './module.entity';
import { QuizEntity } from './quiz.entity';
import { CategoryEntity } from './category.entity';
import { BaseEntity } from "../common/mysql/base.entity";

@Entity()
export class CourseEntity extends BaseEntity{
  @Column({
    name: 'course_name'
  })
  courseName: string;

  @Column('text')
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.instructorOf)
  instructorId: UserEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.courses)
  category: CategoryEntity;

  @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.course)
  enrollments: EnrollmentEntity[];

  @OneToMany(() => ModuleEntity, (module) => module.course)
  modules: ModuleEntity[];

  @OneToMany(() => QuizEntity, (quiz) => quiz.course)
  quizzes: QuizEntity[];
}
