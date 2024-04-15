import { Module } from '@nestjs/common';
import { CoursesResolver } from 'src/resolvers/courses/courses.resolver';
import { CourseService } from 'src/services/course/course.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports:[
        PrismaModule
    ],
    providers:[
        CoursesResolver,
        CourseService,
    ]
})
export class CourseModule {}
