import { Module } from '@nestjs/common';
import { UserResolver } from 'src/resolvers/user/user.resolver';
import { UserService } from 'src/services/user/user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserCourseService } from 'src/services/user-course/user-course.service';
import { PubSub } from 'graphql-subscriptions';

@Module({
    imports: [
        PrismaModule,
    ],
    providers: [
        UserResolver,
        UserService,
        UserCourseService,
        PubSub
    ],
})
export class UserModule { }
