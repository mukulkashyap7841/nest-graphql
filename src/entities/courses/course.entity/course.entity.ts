
import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType({
    description: "Course model"
})

export class CourseEntity {
    @Field(() => Number, { nullable: true })
    id: number
    name: string
    price: number
    @Field(() => Date, { nullable: true })
    created_at: Date
}
