import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { UserService } from 'src/services/user/user.service';
import { UserEntity } from 'src/entities/user/user.entity/user.entity';
import { BadRequestException, ConflictException, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { CreateUserInput } from 'src/inputs/user/create-user.input/create-user.input';
import { UserInputError } from '@nestjs/apollo';
import { UpdateUserInput } from 'src/inputs/user/update-user.input/update-user.input';
import { UserCourseService } from 'src/services/user-course/user-course.service';
import { CourseEntity } from 'src/entities/courses/course.entity/course.entity';
import { PubSub } from 'graphql-subscriptions';

@Resolver(of => UserEntity)
export class UserResolver {


    constructor(private userService: UserService, private userCourseService: UserCourseService, private pubSub: PubSub) { }

    /**
     * 
     * @returns the array of users
     */
    @Query(() => [UserEntity], { name: "users" })
    async users() {

        return await this.userService.getUsers();
    }

    /**
     * 
     * @returns the courses associated with each user
     */
    @ResolveField(() => [CourseEntity], { name: "courses", nullable: true })
    async courses(@Parent() user: UserEntity) {

        const { id } = user;
        let courses = await this.userCourseService.getCourses(id)

        let enrolledCourses = courses.map((course) => course.course)
        return enrolledCourses
    }

    /**
     * 
     * @param id 
     * @returns the user profile
     */
    @Query(() => UserEntity, { name: "user" })
    async user(@Args("id", { type: () => ID, nullable: true }, ParseIntPipe) id: number = 1) {

        let user = await this.userService.getUserProfile(id);

        if (!user) {
            throw new NotFoundException(`Invalid User ID`)
        }

        return user
    }

    /**
     * 
     * @param createUserInput 
     * @returns the info of created user and publish the event as sendsignupemail
     */
    @Mutation(() => UserEntity, { name: "addUser", nullable: true })
    async addUser(@Args("createUserInput") createUserInput: CreateUserInput) {

        try {
            const { email } = createUserInput;

            const isUserExist = await this.userService.checkUser({ email })

            if (isUserExist) {
                throw new ConflictException(`${email} already exist. Please try another..`)
            }

            const user = await this.userService.addUser(createUserInput)

            this.pubSub.publish("userCreated", {
                sendSignupEmail: user
            })

            return user;
        } catch (error) {
            return error
        }
    }

    /**
     * 
     * @param user_id 
     * @param updateUserInput 
     * @returns the updated user info
     */
    @Mutation(() => UserEntity, { name: "updateUser", nullable: true })
    async updateUser(@Args("id") user_id: number, @Args("updateUserInput") updateUserInput: UpdateUserInput) {

        try {

            const { email = "" } = updateUserInput

            const userInfo = await this.userService.getUserProfile(user_id)

            if (!userInfo) {
                throw new UserInputError(`Invalid user id ${user_id}`)
            }

            if (email) {

                console.log(email)

                const isUserEmailExist = await this.userService.checkUser({
                    email,
                    id: {
                        not: user_id
                    }
                })

                if (isUserEmailExist) {
                    throw new ConflictException(`${email} already exist. Please try another..`)
                }
            }

            return await this.userService.updateUser(user_id, updateUserInput)
        } catch (error) {
            return error
        }
    }

    /**
     * 
     * @param user_id 
     * @returns the info of deleted user
     */
    @Mutation(() => UserEntity, { name: "deleteUser" })
    async deleteUser(@Args("id", { type: () => ID }) user_id: number) {

        try {
            user_id = typeof user_id == "string" ? Number(user_id) : user_id;

            const userInfo = await this.userService.getUserProfile(user_id)

            if (!userInfo) {
                throw new BadRequestException(`Invalid user id`)
            }

            return await this.userService.removeUser(user_id)

        } catch (error) {
            return error
        }
    }

    /**
     * 
     * @returns the newsly created user, and will get executed whenever a new user is created
     */
    @Subscription(() => UserEntity, { name: "sendSignupEmail" })
    sendSignupEmail() {

        this.pubSub.subscribe('userCreated', (user) => {

            if (user) {
                const { email } = user.sendSignupEmail
                console.log(`We can send email to ${email}`)
            }
        });

        return this.pubSub.asyncIterator("userCreated")
    }
}
