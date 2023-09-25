import { IsString, IsEmail, IsOptional } from "class-validator";
import { BaseDto } from "../common/base.dto";
import { CourseEntity } from "../entities/course.entity";
import { Expose, Type } from "class-transformer";
import { EnrollmentEntity } from "../entities/enrollment.entity";

export class CreateUserDto extends BaseDto{
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  userName: string;

  @IsString()
  password: string;

  @IsOptional()
  @Type(() => CourseEntity)
  instructorOf: CourseEntity[]

  @IsOptional()
  @Type(() => EnrollmentEntity)
  enrollments: EnrollmentEntity[]
}

export class UserDto extends BaseDto{
  @Expose()
  @IsString()
  firstName: string;

  @Expose()
  @IsString()
  lastName: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  userName: string;

  @IsString()
  password: string;

  @Expose()
  instructorOf: CourseEntity[]

  @IsOptional()
  @Type(() => EnrollmentEntity)
  enrollments: EnrollmentEntity[]
}

export class UpdateUserDto extends BaseDto{
  @IsOptional()
  @Expose()
  @IsString()
  firstName: string;

  @IsOptional()
  @Expose()
  @IsString()
  lastName: string;

  @IsOptional()
  @Expose()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  userName: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @Expose()
  instructorOf: CourseEntity[]
}