import {
  Body, Controller, Delete,
  Get, Param, Post, Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseData } from '../../global/globalClass';
import { HttpMessage, HttpStatus } from '../../global/globalEnum';
import { CreateUserDto, UpdateUserDto, UserDto } from "../../dto/user.dto";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getUsers(): Promise<ResponseData<UserDto[]>> {
    try {
      return new ResponseData<UserDto[]>(
        await this.userService.getAllUser(),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<UserDto[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('/:id')
  async getUserDetails(@Param('id') id: string): Promise<ResponseData<UserDto>> {
    const result =  await this.userService.get(id)
    try {
      return new ResponseData<UserDto>(
       UserDto.plainToInstance(result),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<UserDto>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<ResponseData<UserDto>> {
    try {
      return new ResponseData<UserDto>(
        await this.userService.createUser(createUserDto),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<UserDto>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  // @Post(':id/enroll/:courseId')
  // async enrollUserInCourse(@Param('id') id: string, @Param('courseId') courseId: string) {
  //   return this.userService.enrollUserInCourse(id, courseId);
  // }

  @Put('/:id')
  async updateUserDetails(
    @Param('id') id: string,
    @Body() userDto: UpdateUserDto,
  ): Promise<ResponseData<string>> {
    try {
      return new ResponseData<string>(
        await this.userService.update(id, userDto),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<string>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<ResponseData<string>> {
    try {
      return new ResponseData<string>(
        await this.userService.delete(id),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<string>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
