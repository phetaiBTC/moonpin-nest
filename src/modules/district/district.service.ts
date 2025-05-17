import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { District } from './entities/district.entity';
@Injectable()
export class DistrictService {
  constructor(
    @InjectRepository(District) private districtRepository: Repository<District>,
  ) { }
  findByProvince(id: number) {
    return this.districtRepository.find({
      where: {
        province: {
          pr_id: id
        }
      },
      relations: ['province']
    });
  }


  findOneBy(id: number) {
    return this.districtRepository.findOneBy({ dr_id: id });
  }
}
