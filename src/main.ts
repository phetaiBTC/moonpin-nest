import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
<<<<<<< HEAD
import { ValidationPipe } from '@nestjs/common';

=======
import { ValidationPipe, BadRequestException } from '@nestjs/common';
>>>>>>> 451748af06001e96e87b7dcafece38a6e2c10322
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
<<<<<<< HEAD
      transform: true,
    })
=======
      transform: true
    }),
>>>>>>> 451748af06001e96e87b7dcafece38a6e2c10322
  );
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
