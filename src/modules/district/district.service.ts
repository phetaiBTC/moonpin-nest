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
  ){}
  create(createDistrictDto: CreateDistrictDto) {
    return 'This action adds a new district';
  }

  findAll() {
    return `This action returns all district`;
  }

  findOne(id: number) {
    return `This action returns a #${id} district`;
  }

  update(id: number, updateDistrictDto: UpdateDistrictDto) {
    return `This action updates a #${id} district`;
  }

  remove(id: number) {
    return `This action removes a #${id} district`;
  }

  findOneBy(id: number) {
    return this.districtRepository.findOneBy({ dr_id: id });
  }
}
