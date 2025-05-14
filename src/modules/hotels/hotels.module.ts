import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { DistrictModule } from '../district/district.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel]), UsersModule,DistrictModule],
  controllers: [HotelsController],
  providers: [HotelsService],
})
export class HotelsModule { }
