import { Module } from '@nestjs/common';
import { AmenitiesService } from './amenities.service';
import { AmenitiesController } from './amenities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Amenity } from './entities/amenity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Amenity])],
  controllers: [AmenitiesController],
  providers: [AmenitiesService],
})
export class AmenitiesModule {}
