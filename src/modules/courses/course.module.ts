import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseEntity } from "../../entities/course.entity";
import { CategoryService } from "../categories/category.service";
import { CategoryEntity } from "../../entities/category.entity";
import { UserEntity } from "../../entities/user.entity";
import { UserService } from "../users/user.service";
import { ImageService } from "./image.service";
import { ImagesController } from "./image.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseEntity]),
    TypeOrmModule.forFeature([CategoryEntity]),
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [CourseController, ImagesController],
  providers: [CourseService, CategoryService, UserService, ImageService],
  exports: [CourseService, ImageService]
})
export class CourseModule {}
