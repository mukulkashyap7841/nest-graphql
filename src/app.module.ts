import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { PrismaService } from './services/prisma/prisma.service';
import { UserService } from './services/user/user.service';
import { UserResolver } from './resolvers/user/user.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      // buildSchemaOptions: {
      //   numberScalarMode: "integer"
      // },
      definitions: {
        path: join(process.cwd(), "src/graphql.ts")
      }
    }),
  ],
  controllers: [AppController],
  providers: [PrismaService, UserService, AppController, UserResolver],
})
export class AppModule { }
