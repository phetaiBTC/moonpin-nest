import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistrictModule } from './modules/district/district.module';
import { ProvinceModule } from './modules/province/province.module';
import { UsersModule } from './modules/users/users.module';
import { HotelsModule } from './modules/hotels/hotels.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { AmenitiesModule } from './modules/amenities/amenities.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { RolesModule } from './modules/roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }), DistrictModule, ProvinceModule, UsersModule, HotelsModule, RoomsModule, BookingsModule, AmenitiesModule, PaymentsModule, ReviewsModule, RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
