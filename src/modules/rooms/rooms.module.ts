import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { AmenitiesModule } from '../amenities/amenities.module';
@Module({
  imports:[TypeOrmModule.forFeature([Room]),AmenitiesModule],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
