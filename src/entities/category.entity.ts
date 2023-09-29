import { Entity, Column, OneToMany } from 'typeorm';
import { CourseEntity } from './course.entity';
import { BaseEntity } from "../common/mysql/base.entity";

@Entity()
export class CategoryEntity extends BaseEntity{
  @Column( {
    name: 'category_name'
  })
  categoryName: string;

  @OneToMany(() => CourseEntity, (course) => course.category)
  courses: CourseEntity[];
}
