import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { DistrictService } from '../district/district.service';
import { compressAndSaveImage } from '@/utils/image.util';
@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel) private hotelRepository: Repository<Hotel>,
    readonly districtService: DistrictService,
  ) { }
  async create(createHotelDto: CreateHotelDto, image: Express.Multer.File) {
    const district = await this.districtService.findOneBy(createHotelDto.district);
    console.log(district);
    if (!district) {
      throw new BadRequestException('District not found');
    }
    const filename = await compressAndSaveImage(image.buffer, image.originalname);
    const hotel = this.hotelRepository.create({
      ...createHotelDto,
      image: filename,
      district
    });
    const result = await this.hotelRepository.save(hotel);
    return {
      message: 'create hotel successfully',
      data: result,
    };
  }




  findAll() {
    return this.hotelRepository.find();
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
