import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }
  create(createUserDto: CreateUserDto) {
    // return {message:createUserDto}
    const user = this.usersRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password,
      phone: createUserDto.phone,
      gender: createUserDto.gender,
      district: { dr_id: createUserDto.district }
    });
    this.usersRepository.save(user);
    return { message: "User created successully", data: user }
  }

  async findAll() {
    const users = await this.usersRepository.find({
      relations: ['district','district.province'],
    });
    const mapper = users.map((user) => {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        district: user.district.dr_name,
        district_en: user.district.dr_name_en,
        province: user.district.province.pr_name,
        province_en: user.district.province.pr_name_en,
        isVerified: user.isVerified,
        created_at: user.created_at,
        updated_at: user.updated_at
      }
    })
    return { message: "All users", data: mapper };
  }


  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
