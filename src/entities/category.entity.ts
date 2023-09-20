import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { CourseEntity } from './course.entity';
import { BaseEntity } from "../common/mysql/base.entity";

@Entity()
export class CategoryEntity extends BaseEntity{
  @Column()
  categoryName: string;

  @ManyToMany(() => CourseEntity, (course) => course.categories)
  @JoinTable()
  courses: CourseEntity[];
}
