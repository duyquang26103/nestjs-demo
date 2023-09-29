import { Entity, Column, ManyToOne } from 'typeorm';
import { CourseEntity } from './course.entity';
import { BaseEntity } from "../common/mysql/base.entity";

@Entity()
export class ModuleEntity extends BaseEntity{
  @Column()
  moduleName: string;

  @ManyToOne(() => CourseEntity, (course) => course.modules)
  course: CourseEntity;

  @Column('text')
  content: string;

  @Column()
  sequenceNumber: number;
}
