import { Injectable } from '@nestjs/common';
import { BaseService } from "../../common/mysql/base.service";
import { CourseEntity } from "../../entities/course.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseDto } from "../../dto/course.dto";

@Injectable()
export class CourseService extends BaseService<CourseEntity> {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
  ) {
    super(courseRepository);
  }

  async createCourse(entity: CourseEntity): Promise<CourseDto> {
    let newCourse;
    if(!entity.creationDate) {
      newCourse = await super.create({...entity, creationDate: new Date() });
    } else {
      newCourse = await super.create(entity);

    }
    return CourseDto.plainToInstance(newCourse);
  }
}
