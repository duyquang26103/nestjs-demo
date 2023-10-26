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

  async createCourse (
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

  async getCourseByCategory(category: CategoryDto, courseId: string): Promise<CourseDto> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId, category },
    });
    return CourseDto.plainToInstance(course);
  }

  async getCoursesByCategory(category: CategoryDto): Promise<CourseDto[]> {
    const courses = await this.courseRepository.find({
      where: { category },
    });

    return CourseDto.plainToInstanceArray(courses);
  }

  async getCourses(): Promise<CourseDto[]> {
    const courses = await this.courseRepository.find({
      relations: { category: true, instructor: true},
    });

    return CourseDto.plainToInstanceArray(courses)
  }
}
