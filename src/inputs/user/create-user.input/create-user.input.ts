import { Field, InputType } from "@nestjs/graphql"

@InputType()

export class CreateUserInput {
    @Field(() => Number, { nullable: true })
    id: number
    name: string
    email: string
    @Field(() => Date, { nullable: true })
    created_at: Date
}
