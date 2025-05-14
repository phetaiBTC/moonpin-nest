import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,                      // ลบ properties ที่ไม่อยู่ใน DTO
      forbidNonWhitelisted: true,           // ปฏิเสธข้อมูลที่มี properties ที่ไม่อยู่ใน DTO
      // transform: true,                      // ใช้แปลงค่า
      // transformOptions: {
      //   enableImplicitConversion: true,
      // }
    }),
  );

  app.enableCors();
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
