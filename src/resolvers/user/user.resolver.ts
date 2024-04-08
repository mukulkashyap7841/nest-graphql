import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from 'src/services/user/user.service';
import * as date from 'date-and-time';
import { UserEntity as UserInterface } from '../../graphql';
import { UserEntity } from 'src/entities/user/user.entity/user.entity';
import { ParseIntPipe } from '@nestjs/common';
import { CreateUserInput } from 'src/inputs/user/create-user.input/create-user.input';

@Resolver()
export class UserResolver {

    constructor(private userService: UserService) { }

    @Query(() => [UserEntity], { name: "users" })
    async users() {

        let users: UserInterface[] = await this.userService.getUsers();

        if (users) {
            users = users.map((user: UserInterface) => {
                return {
                    ...user,
                    created_on: date.format(user.created_at, "YYYY-MM-DD")
                }
            })
        }
        return users
    }

    @Query(() => UserEntity, { name: "user", nullable: true })
    async user(@Args("id", { type: () => ID }, ParseIntPipe) id: number) {

        let user: UserInterface = await this.userService.getUserProfile(id);

        if (user) {
            return {
                ...user,
                created_on: date.format(user.created_at, "YYYY-MM-DD")
            }
        } else {
            return null
        }
    }

    @Mutation(() => UserEntity, { name: "addUser", nullable: true })
    async addUser(@Args("createUserInput") createUserInput: CreateUserInput) {

        try{
            return await this.userService.addUser(createUserInput)
        }catch(error){
            console.log(error.message)
            return null
        }
    }
}
