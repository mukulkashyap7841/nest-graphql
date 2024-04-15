import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from 'src/inputs/user/create-user.input/create-user.input';
import { UpdateUserInput } from 'src/inputs/user/update-user.input/update-user.input';
import { UserEntity } from 'src/entities/user/user.entity/user.entity';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) { }

    async getUsers() {
        return await this.prisma.user.findMany()
    }

    // async getUsersWithEnrolledCourses() {
    //     return await this.prisma.user.findMany({
    //         select: {
    //             id: true,
    //             name: true,
    //             email: true,
    //             UserCourses: {
    //                 select: {
    //                     user_id: true,
    //                     course_id: true,
    //                     course: {
    //                         select: {
    //                             id: true,
    //                             name: true,
    //                             price: true
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     })
    // }

    async getUserProfile(id: number) {
        return await this.prisma.user.findFirst({
            where: {
                id
            }
        })
    }

    async addUser(data: CreateUserInput): Promise<CreateUserInput> {

        return await this.prisma.user.create({
            data
        })
    }

    async updateUser(user_id, data: UpdateUserInput): Promise<UpdateUserInput> {

        return await this.prisma.user.update({
            where: {
                id: user_id
            },
            data
        })
    }

    async removeUser(user_id): Promise<UpdateUserInput> {

        return await this.prisma.user.delete({
            where: {
                id: user_id
            },
        })
    }

    async checkUser(where): Promise<UserEntity> {

        return await this.prisma.user.findFirst({
            where
        })
    }
}
