import { Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';

@Injectable()
export class HotelsService {
  // constructor(@InjectRepository(Hotel) private hotelRepository: Repository<Hotel>) { }
  async create(createHotelDto: CreateHotelDto) {
    // const hotel = await this.hotelRepository.save(createHotelDto);
    // return {
    //   message: "create hotel successully",
    //   data: hotel
    // };
    return `This action returns all hotels`;

  }

  findAll() {
    return `This action returns all hotels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hotel`;
  }

  update(id: number, updateHotelDto: UpdateHotelDto) {
    return `This action updates a #${id} hotel`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotel`;
  }
}
