import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity as UserInterface } from '../../graphql';
import { CreateUserInput } from 'src/inputs/user/create-user.input/create-user.input';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) { }

    async getUsers(): Promise<UserInterface[]> {
        return await this.prisma.user.findMany()
    }

    async getUserProfile(id: number): Promise<UserInterface> {
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
}
