import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDto, CreateCourseDto, editCourseDto } from "../../dto/course.dto";
import { CategoryService } from "../categories/category.service";
import { ResponseData } from "../../global/globalClass";
import { HttpMessage, HttpStatus } from "../../global/globalEnum";
import { UserService } from "../users/user.service";
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from "./image.service";

@Controller('category/:name/course')
export class CourseController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly courseService: CourseService,
    private readonly userService: UserService,
    private readonly imageService: ImageService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createCourse(@Param('name') categoryName: string,
                     @Body() course: CreateCourseDto,
                     @UploadedFile() file
  ): Promise<ResponseData<CourseDto>> {
    const category = await this.categoryService.findCategoryByName(categoryName);


    if(!course.instructor) {
      course.instructor = await this.userService.getById('3080e927-063b-4d11-a858-ebcca9b755d2');
    }

    if (!course.image) {
      const recordId = await this.imageService.uploadDataToKintone(course.courseName ,file);
      course.image = await this.imageService.getFileKey(recordId);
    }

    const newCourse = await this.courseService.createCourse(category, course);

    return new ResponseData<CourseDto>(
      newCourse,
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS
    );
  }

  @Get(':id')
  async getSpecificCourse(@Param('name') categoryName: string, @Param('id') id: string): Promise<ResponseData<CourseDto>> {
    const category = await this.categoryService.findCategoryByName(categoryName);
    const course = await this.courseService.getCourseByCategory(category, id)
    return new ResponseData<CourseDto>(
      course,
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS
    );
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

    try {
      return new ResponseData<CourseDto[]>(
        courses,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS
      );
    } catch (e) {
      return new ResponseData<CourseDto[]>(
        null,
        HttpStatus.SERVER_ERROR,
        HttpMessage.SERVER_ERROR
      )
    }
  }

  @Put(':id')
  async updateCourse(
    @Param('id') id: string,
    @Body() courseDto: editCourseDto,
    @UploadedFile() file
  ): Promise<ResponseData<string>> {

    if (file) {
      const recordId = await this.imageService.uploadDataToKintone(courseDto.courseName ,file);
      courseDto.image = await this.imageService.getFileKey(recordId);
    }

    const status = await this.courseService.update(id, courseDto);
    return new ResponseData<string>(
      status,
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS
    );
  }

  @Delete(':id')
  async deleteCourse(@Param('id') id: string): Promise<ResponseData<string>> {
    const status = await this.courseService.delete(id);
    return new ResponseData<string>(
      status,
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS
    );
  }
}
