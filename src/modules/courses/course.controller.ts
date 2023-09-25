import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDto, CreateCourseDto } from "../../dto/course.dto";
import { CourseEntity } from '../../entities/course.entity';
import { CategoryService } from "../categories/category.service";

@Controller('category/:name/course')
export class CourseController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly courseService: CourseService
  ) {}

  @Post()
  async createCourse(@Param('name') categoryName: string, @Body() course: CreateCourseDto): Promise<CourseDto> {
    console.log('categoryName', categoryName)

    const category = await this.categoryService.findCategoryByName(categoryName);
    console.log('hihihihihih', category)
    return await this.courseService.createCourse(category, course);
  }

  @Get()
  async getAllCourses(): Promise<CourseEntity[]> {
    return this.courseService.getAll();
  }

  @Get(':id')
  async getCourseById(@Param('name') categoryName: string, @Param('id') id: string): Promise<CourseDto> {
    const category = await this.categoryService.findCategoryByName(categoryName)
    const course = await this.courseService.getCourseByCategory(category, id);
    console.log(course);
    return CourseDto.plainToInstance(course);
  }



  @Put(':id')
  async updateCourse(@Param('id') id: string, @Body() courseDto: CourseDto): Promise<CourseDto> {
    return this.courseService.update(id, courseDto);
  }

  @Delete(':id')
  async deleteCourse(@Param('id') id: string): Promise<string> {
    return this.courseService.delete(id);
  }
}
