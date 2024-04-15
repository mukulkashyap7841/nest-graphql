import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
    imports: [
        GraphQLModule.forRoot({
            driver: ApolloDriver,
            installSubscriptionHandlers: true,
            playground: true,
            autoSchemaFile: join(process.cwd(), "src/schema.gql"),
            // buildSchemaOptions: {
            //     numberScalarMode: "integer",
            // },
            formatError: (error) => {

                if (error) {
                    const { message, statusCode } = error.extensions.originalError;
                    return {
                        status: statusCode, message
                    };
                }
            },
            // definitions: {
            //     path: join(process.cwd(), "src/graphql.ts")
            // }
        }),
    ]
})
export class NestGraphqlModule { }
