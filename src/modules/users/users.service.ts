import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import * as bcryptjs from 'bcryptjs'
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }
  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create({
      ...createUserDto,
      password:await bcryptjs.hash(createUserDto.password,10),
      district: { dr_id: createUserDto.district },
      hotels: { id: createUserDto.hotels },
    });
    try {
      const save = await this.usersRepository.save(user);
      return { message: "User created successully", data: save }
    } catch (e) {
      if (e.code === '23505' || e.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('email is already');
      }
      throw new InternalServerErrorException();
    }
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<any>> {
    const queryBuilder = this.usersRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.district', 'district')
      .leftJoinAndSelect('district.province', 'province')
      .leftJoinAndSelect('user.hotels', 'hotels')
      .orderBy('user.created_at', 'DESC');
    const paginated = await paginate(queryBuilder, options);
    // console.log(paginated)

    const mapped = paginated.items.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      hotels: user.hotels || null,
      district: user.district?.dr_name || null,
      district_en: user.district?.dr_name_en || null,
      province: user.district?.province?.pr_name || null,
      province_en: user.district?.province?.pr_name_en || null,
      isVerified: user.isVerified,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }));

    return {
      ...paginated,
      items: mapped,
    };
  }



  findOne(id: number) {
    return this.usersRepository.findOneBy({ id: id });
  }
  findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email: email });
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email: email });
  }
}
