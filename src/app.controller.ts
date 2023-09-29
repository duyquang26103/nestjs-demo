import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CourseService } from "./modules/courses/course.service";
import { CourseDto } from "./dto/course.dto";
import { ResponseData } from "./global/globalClass";
import { HttpMessage, HttpStatus } from "./global/globalEnum";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly courseService: CourseService
  ) {}

  @Get('/courses')
  async getCourses(): Promise<ResponseData<CourseDto[]>> {
    const courses = await this.courseService.getCourses();

    if (!courses) {
      return new ResponseData<CourseDto[]>(
        null,
        HttpStatus.CLIENT_NOT_FOUND,
        HttpMessage.NOT_FOUND
      )
    }

    try {
      return new ResponseData<CourseDto[]>(
        CourseDto.plainToInstanceArray(courses),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS
      )
    } catch (e) {
      return new ResponseData<CourseDto[]>(
        null,
        HttpStatus.SERVER_ERROR,
        HttpMessage.SERVER_ERROR
      )
    }
  }
}
