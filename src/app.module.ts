import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './modules/courses/course.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from "./modules/categories/category.module";
import { UserEntity } from './entities/user.entity';
import { CourseEntity } from './entities/course.entity';
import { EnrollmentEntity } from './entities/enrollment.entity';
import { CategoryEntity } from './entities/category.entity';
import { ModuleEntity } from './entities/module.entity';
import { QuizEntity } from './entities/quiz.entity';

@Module({
  imports: [
    CourseModule,
    UsersModule,
    CategoryModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3309,
      username: 'root',
      password: 'root',
      database: 'e-learning',
      entities: [
        UserEntity,
        CourseEntity,
        EnrollmentEntity,
        CategoryEntity,
        ModuleEntity,
        QuizEntity,
      ],
      logging: 'all',
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
