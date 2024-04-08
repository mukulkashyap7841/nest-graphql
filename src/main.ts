import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port:number=4000
  await app.listen(port);
  app.enableCors()
  console.log(`Graphql App is running on ${port}`)
}
bootstrap();
