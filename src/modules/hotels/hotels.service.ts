import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { DistrictService } from '../district/district.service';
import { compressAndSaveImage } from '@/utils/image.util';
import { formatTime } from '@/utils/formatTime';
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




  async findAll() {
    const hotels = await this.hotelRepository.find({ relations: ['users', 'district', 'district.province'] })
    const mapper = hotels.map(hotel => ({
      id: hotel.id,
      name: hotel.name,
      description: hotel.description,
      rating: hotel.rating,
      image: hotel.image,
      users: hotel.users.map(user => ({ userId: user.id, username: user.username, email: user.email })),
      latitude: hotel.latitude,
      longitude: hotel.longitude,
      district: hotel.district.dr_name,
      district_en: hotel.district.dr_name_en,
      province: hotel.district.province.pr_name,
      province_en: hotel.district.province.pr_name_en,
      created_at: formatTime(hotel.created_at),
      updated_at: formatTime(hotel.updated_at)
    }))
    return mapper;
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
