import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/mysql/base.service';
import { CourseEntity } from '../../entities/course.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseDto, CreateCourseDto } from '../../dto/course.dto';
import { CategoryDto } from '../../dto/category.dto';
import { CategoryEntity } from "../../entities/category.entity";

@Injectable()
export class CourseService extends BaseService<CourseEntity> {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {
    super(courseRepository);
  }

  async createCourse(
    category: CategoryDto,
    entity: CourseEntity,
  ): Promise<CourseDto> {
    let newCourse;
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const newCourseDto = new CreateCourseDto();
    newCourseDto.category = category;

    newCourse = { ...newCourseDto, ...entity };
    const createdCourse = await super.create(newCourse);
    await this.categoryRepository.save(category);

    return CourseDto.plainToInstance(createdCourse);
  }

  async getCourseByCategory(category: CategoryDto, courseId: string) {
    return this.courseRepository.findOne({
      where: { id: courseId, category },
    });
  }

  async getCoursesByCategory(category: CategoryDto) {
    return this.courseRepository.find({
      where: { category },
    });
  }

  async getCourses() {
    return this.courseRepository.find({
      relations: { category: true},
    });
  }
}
