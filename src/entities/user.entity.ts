import { Entity, Column, OneToMany } from "typeorm";
import { CourseEntity } from './course.entity';
import { BaseEntity } from "../common/mysql/base.entity";

@Entity()
export class UserEntity extends BaseEntity{
  @Column({
    name: 'first_name'
  })
  firstName: string;

  @Column({
    name: 'last_name'
  })
  lastName: string;

  @Column()
  email: string;

  @Column({
    name: 'user_name'
  })
  userName: string;

  @Column()
  password: string;

  @OneToMany(() => CourseEntity, (course) => course.instructor)
  instructorOf: CourseEntity[];
}
