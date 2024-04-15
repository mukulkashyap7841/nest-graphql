import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CourseService {

    constructor(private prisma: PrismaService) { }

    getCourses = async () => {
        return await this.prisma.courses.findMany()
    }

}
