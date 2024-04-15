import { Field, ObjectType } from "@nestjs/graphql"
import { UserCourseEntity } from "src/entities/courses/user-course.entity/user-course.entity"

@ObjectType({
    description: "User model"
})

export class UserEntity {
    @Field(() => Number, { nullable: true })
    id: number
    name: string
    email: string
    @Field(() => Date, { nullable: true })
    created_at: Date
}
