import { Field, ID, ObjectType } from "@nestjs/graphql"
import { CourseEntity } from "../course.entity/course.entity"

@ObjectType({
    description: "User model"
})

export class UserCourseEntity {
    @Field(() => Number, { nullable: true })
    id: number
    user_id: number
    course_id: number
    @Field(type => CourseEntity)
    course: CourseEntity
} 