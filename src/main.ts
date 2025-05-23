import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import * as express from 'express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    const reflector = app.get(Reflector);
  app.use('/assets', express.static(join(__dirname, '..', 'assets')));
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,                      // ลบ properties ที่ไม่อยู่ใน DTO
      forbidNonWhitelisted: true,           // ปฏิเสธข้อมูลที่มี properties ที่ไม่อยู่ใน DTO
      transform: true,                      // ใช้แปลงค่า
      transformOptions: {
        enableImplicitConversion: true,
      }
    }),
  );

  app.enableCors();
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
