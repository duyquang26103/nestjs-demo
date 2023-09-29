import { Entity, ManyToOne, Column } from 'typeorm';
import { UserEntity } from './user.entity';
import { CourseEntity } from './course.entity';
import { BaseEntity } from "../common/mysql/base.entity";

@Entity()
export class EnrollmentEntity extends BaseEntity{
  @ManyToOne(() => UserEntity, (user) => user.enrollments)
  user: UserEntity;

  @ManyToOne(() => CourseEntity, (course) => course.enrollments)
  course: CourseEntity;

  @Column({ type: 'date' })
  enrollmentDate: Date;
}
