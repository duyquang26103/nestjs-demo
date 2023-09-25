import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDto, CreateCourseDto } from "../../dto/course.dto";
import { CategoryService } from "../categories/category.service";
import { ResponseData } from "../../global/globalClass";
import { HttpMessage, HttpStatus } from "../../global/globalEnum";

@Controller('category/:name/course')
export class CourseController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly courseService: CourseService
  ) {}

  @Post()
  async createCourse(@Param('name') categoryName: string, @Body() course: CreateCourseDto): Promise<CourseDto> {
    const category = await this.categoryService.findCategoryByName(categoryName);
    return await this.courseService.createCourse(category, course);
  }

  @Get(':id')
  async getSpecificCourse(@Param('name') categoryName: string, @Param('id') id: string): Promise<CourseDto> {
    const category = await this.categoryService.findCategoryByName(categoryName);
    console.log('category',category)
    const course = await this.courseService.getCourseByCategory(category, id);
    console.log('course', course)
    return CourseDto.plainToInstance(course);
  }

  @Get()
  async getAllCoursesByCategory(@Param('name') categoryName: string): Promise<ResponseData<CourseDto[]>> {
    const category = await this.categoryService.findCategoryByName(categoryName);
    if (!category) {
      return new ResponseData<CourseDto[]>(
        null,
        HttpStatus.CLIENT_NOT_FOUND,
        HttpMessage.NOT_FOUND
      )
    }
    const courses = await this.courseService.getCoursesByCategory(category);
    if (!courses) {
      return new ResponseData<CourseDto[]>(
        null,
        HttpStatus.CLIENT_NOT_FOUND,
        HttpMessage.NOT_FOUND
      )
    }

    let validateCourse = [];
    for (const courseEntity of courses) {
      validateCourse.push(CourseDto.plainToInstance(courseEntity));
    }
    return new ResponseData<CourseDto[]>(
      validateCourse,
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS
    );
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
