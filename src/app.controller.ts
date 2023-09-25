import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CourseService } from "./modules/courses/course.service";
import { CategoryService } from "./modules/categories/category.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly courseService: CourseService,
    private readonly categoryService: CategoryService
  ) {}

  @Get('/courses')
  async getCourses() {
    const categories = await this.categoryService.getAllCategories();
    console.log('categories', categories)
    const coursesPromises = categories.map(async (category) => {
      console.log('currentCate', category)
      const courses = await this.courseService.getCoursesByCategory(category);
      console.log('courses', courses)

      return courses.map((course) => ({ ...course, categoryName: category.categoryName }));
    });
    console.log('coursesPromises', coursesPromises)

    const coursesByCategory = await Promise.all(coursesPromises);
    return coursesByCategory.reduce((acc, courses) => [...acc, ...courses], []);
  }

  @Get('/categories/courses')
  async getCategoriesAndCourses() {
    const categories = await this.categoryService.getAllCategories();
    const categoryPromises = categories.map(async (category) => {
      const courses = await this.courseService.getCoursesByCategory(category);
      return { ...category, courses };
    });
    return Promise.all(categoryPromises);
  }
}
