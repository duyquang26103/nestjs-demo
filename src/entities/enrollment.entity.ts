import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { UserEntity } from './user.entity';
import { CourseEntity } from './course.entity';

@Entity()
export class EnrollmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.enrollments)
  user: UserEntity;

  @ManyToOne(() => CourseEntity, (course) => course.enrollments)
  course: CourseEntity;

  @Column({ type: 'date' })
  enrollmentDate: Date;
}
