import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { CourseModule } from './modules/course/course.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { NestGraphqlModule } from './modules/nest-graphql/nest-graphql.module';

@Module({
  imports: [
    NestGraphqlModule,
    UserModule,
    CourseModule,
    PrismaModule,
  ],
  providers: [],
})
export class AppModule { }
