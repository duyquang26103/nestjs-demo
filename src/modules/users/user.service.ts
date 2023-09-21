import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { BaseService } from "../../common/mysql/base.service";
import { UserDto } from "../../dto/user.dto";

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }

  async createUser(entity: UserEntity): Promise<UserDto> {
    if (!entity.registrationDate) {
      const newUser = { ...entity, registrationDate: new Date() };
      return UserDto.plainToInstance(await super.create(newUser));
    }

    return UserDto.plainToInstance(await super.create(entity));
  }

  async getAllUser(): Promise<UserDto[]> {
    let userValidatedList: UserDto[] = [];
    const users = await super.getAll();
    for (const user of users) {
      const validate = UserDto.plainToInstance(user);
      userValidatedList.push(validate);
    }
    return userValidatedList;
  }

  // async enrollUserInCourse(id: string, courseId: string ) {
  //   const user = await super.get(id);
  //   const course = await this.get(courseId);
  //
  //   user.enrollments.push(courseId);
  //   await this.userRepository.save(user);
  // }
}
