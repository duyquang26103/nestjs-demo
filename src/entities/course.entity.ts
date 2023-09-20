import { Entity, Column, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { EnrollmentEntity } from './enrollment.entity';
import { ModuleEntity } from './module.entity';
import { QuizEntity } from './quiz.entity';
import { CategoryEntity } from './category.entity';
import { BaseEntity } from "../common/mysql/base.entity";

@Entity()
export class CourseEntity extends BaseEntity{
  @Column()
  courseName: string;

  @Column('text')
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.instructorOf)
  instructorId: UserEntity;

  @Column({ type: 'date' })
  creationDate: Date;

  @ManyToMany(() => CategoryEntity, (category) => category.courses)
  categories: CategoryEntity[];

  @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.course)
  enrollments: EnrollmentEntity[];

  @OneToMany(() => ModuleEntity, (module) => module.course)
  modules: ModuleEntity[];

  @OneToMany(() => QuizEntity, (quiz) => quiz.course)
  quizzes: QuizEntity[];
}
