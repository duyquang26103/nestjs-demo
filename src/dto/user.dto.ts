import { IsString, IsEmail, IsDate, IsOptional } from "class-validator";
import { BaseDto, Default } from "../common/base.dto";
import { CourseEntity } from "../entities/course.entity";
import { Transform, Expose } from 'class-transformer';
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
  @Default(new Date())
  @IsDate()
  registrationDate: Date;

  @Transform(({ value }) => parseInt(value))
  instructorOf: CourseEntity[]

  @Transform(({ value }) => parseInt(value))
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

  @Expose()
  @IsDate()
  registrationDate: Date;

  @Expose()
  instructorOf: CourseEntity[]
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
  @IsDate()
  registrationDate: Date;

  @IsOptional()
  @Expose()
  instructorOf: CourseEntity[]
}