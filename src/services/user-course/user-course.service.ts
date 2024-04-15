import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserCourseService {

    constructor(private prisma: PrismaService) { }

    async getCourses(user_id: number) {
        return await this.prisma.userCourses.findMany({
            select: {
                course: {
                    select: {
                        id:true,
                        name: true,
                        price:true
                    }
                }
            },
            where: {
                user_id
            }
        })
    }
}
