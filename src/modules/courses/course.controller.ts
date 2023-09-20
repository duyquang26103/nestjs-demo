import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDto, CreateCourseDto } from "../../dto/course.dto";
import { CourseEntity } from '../../entities/course.entity';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async createCourse(@Body() course: CreateCourseDto): Promise<CourseDto> {
    return await this.courseService.createCourse(course);
  }

  @Get()
  async getAllCourses(): Promise<CourseEntity[]> {
    return this.courseService.getAll();
  }

  @Get(':id')
  async getCourseById(@Param('id') id: string): Promise<CourseDto> {
    const course = await this.courseService.get(id);
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
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
