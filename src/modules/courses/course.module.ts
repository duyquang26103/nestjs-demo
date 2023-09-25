import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseEntity } from "../../entities/course.entity";
import { CategoryService } from "../categories/category.service";
import { CategoryEntity } from "../../entities/category.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseEntity]),
    TypeOrmModule.forFeature([CategoryEntity])
  ],
  controllers: [CourseController],
  providers: [CourseService, CategoryService],
  exports: [CourseService]
})
export class CourseModule {}
