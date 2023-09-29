import { IsDate } from 'class-validator';
import { Expose, Type } from "class-transformer";
import { UserEntity } from "../entities/user.entity";
import { CourseEntity } from "../entities/course.entity";
import { BaseDto } from "../common/base.dto"; // Import the Expose decorator

export class EnrollmentDto extends BaseDto{
  @Expose() // Expose this property
  @IsDate()
  enrollmentDate: Date;

  @Expose()
  @Type(() => UserEntity)
  user: UserEntity;

  @Expose()
  @Type(() => CourseEntity)
  course: CourseEntity;
}