import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from "../../common/mysql/base.service";
import { CourseEntity } from "../../entities/course.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseDto, CreateCourseDto } from "../../dto/course.dto";
import { CategoryDto } from "../../dto/category.dto";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CourseService extends BaseService<CourseEntity> {
  constructor(
    @InjectRepository(CourseEntity) private readonly courseRepository: Repository<CourseEntity>,
  ) {
    super(courseRepository);
  }

  async createCourse(category: CategoryDto, entity: CourseEntity): Promise<CourseDto> {
    let newCourse;
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const newCourseDto = new CreateCourseDto();
    newCourseDto.category = category;

    if (!entity.id) {
      newCourse = { ...newCourseDto, ...entity, id: uuidv4() }
    }

    newCourse = { ...newCourseDto, ...entity }
    const createdCourse = await super.create(newCourse);

    return CourseDto.plainToInstance(createdCourse);
  }

  async getCourseByCategory (category: CategoryDto, courseId: string) {
    return this.courseRepository.findOne({
      where: { id: courseId, category }
    });
  }
}
