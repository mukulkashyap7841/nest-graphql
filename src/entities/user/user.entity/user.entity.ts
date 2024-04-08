import { Field, ID, ObjectType } from "@nestjs/graphql"

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
    @Field(() => String, { nullable: true })
    created_on: string
}
