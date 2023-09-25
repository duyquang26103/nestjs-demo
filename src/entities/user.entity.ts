import { Entity, Column, OneToMany } from 'typeorm';
import { EnrollmentEntity } from './enrollment.entity';
import { CourseEntity } from './course.entity';
import { BaseEntity } from "../common/mysql/base.entity";

@Entity()
export class UserEntity extends BaseEntity{
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  userName: string;

  @Column()
  password: string;

  // Specify the instructorOf relationship
  @OneToMany(() => CourseEntity, (course) => course.instructorId)
  instructorOf: CourseEntity[];

  @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.user)
  enrollments: EnrollmentEntity[];
}
