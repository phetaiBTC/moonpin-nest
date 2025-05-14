import { Injectable } from '@nestjs/common';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Amenity } from './entities/amenity.entity';
@Injectable()
export class AmenitiesService {

  constructor(@InjectRepository(Amenity) private amenityRepository: Repository<Amenity>) { }
  async create(createAmenityDto: CreateAmenityDto) {
    const data = await this.amenityRepository.save(createAmenityDto)
    return {
      message: "create amenity successfully",
      data
    };
  }

  findAll() {
    return `This action returns all amenities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} amenity`;
  }

  update(id: number, updateAmenityDto: UpdateAmenityDto) {
    return `This action updates a #${id} amenity`;
  }

  remove(id: number) {
    return `This action removes a #${id} amenity`;
  }
}
