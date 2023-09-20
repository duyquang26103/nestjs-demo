import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CourseEntity } from './course.entity';

@Entity()
export class ModuleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  moduleName: string;

  @ManyToOne(() => CourseEntity, (course) => course.modules)
  course: CourseEntity;

  @Column('text')
  content: string;

  @Column()
  sequenceNumber: number;
}
