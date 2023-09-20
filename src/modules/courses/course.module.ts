import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseEntity } from "../../entities/course.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
