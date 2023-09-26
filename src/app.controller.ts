import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CourseService } from "./modules/courses/course.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly courseService: CourseService
  ) {}

  @Get('/courses')
  async getCourses() {
    return this.courseService.getCourses()
  }
}
