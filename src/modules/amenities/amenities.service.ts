import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Amenity } from './entities/amenity.entity';
import * as dayjs from 'dayjs';

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

  async findAll() {
    const amenities = await this.amenityRepository.find();
    return amenities.map(({ id, name, created_at, updated_at }) => ({
      id,
      name,
      created_at: dayjs(created_at).format('DD-MM-YYYY HH:mm'),
      updated_at: dayjs(updated_at).format('DD-MM-YYYY HH:mm'),
    }));
  }


  async findOne(id: number) {
    const data = await this.amenityRepository.findOneBy({ id: id });
    if (!data) {
      throw new NotFoundException('Amenity not found');
    }
    return data;
  }

  async update(id: number, updateAmenityDto: UpdateAmenityDto) {
    await this.amenityRepository.update(id, updateAmenityDto)
    return {
      message: "update amenity successfully",
    };
  }

  async remove(id: number) {
    await this.amenityRepository.delete(id)
    return {
      message: "delete amenity successfully",
    };
  }

  async findByName(name: string) {
    const data = await this.amenityRepository.find({
      where: { name: Like(`%${name}%`) },
    });

    if (!data.length) {
      throw new NotFoundException('Amenity not found');
    }

    return data;
  }
}
