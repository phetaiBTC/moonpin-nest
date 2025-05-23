import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { formatTime } from '@/utils/formatTime';
@Injectable()
export class RoomsService {
  constructor(@InjectRepository(Room) private roomRepository: Repository<Room>) { }
  async create(createRoomDto: CreateRoomDto, hotelId: number) {
    // console.log(createRoomDto.amenities)
    const room = this.roomRepository.create({
      ...createRoomDto,
      amenities: createRoomDto.amenities.map(id => ({ id })),
      hotel: { id: hotelId }
    });
    await this.roomRepository.save(room);
    return {
      message: "Room created successfully",
      room
    };
  }

  async findAll(options: IPaginationOptions, hotelId: number): Promise<Pagination<any>> {
    const queryBuilder = this.roomRepository.createQueryBuilder('room')
      .leftJoinAndSelect('room.amenities', 'amenities')
      .leftJoinAndSelect('room.hotel', 'hotel')
      .where('hotel.id = :hotelId', { hotelId })
      .orderBy('room.created_at', 'DESC');

    const paginated = await paginate(queryBuilder, options);

    const mappedItems = paginated.items.map(room => ({
      id: room.id,
      room_number: room.room_number,
      description: room.description,
      price: room.price,
      image: room.image,
      status: room.status,
      amenities: room.amenities,
      hotel: room.hotel,
      bedroom: room.bedroom,
      bathroom: room.bathroom,
      kitchen: room.kitchen,
      created_at: formatTime(room.created_at),
      updated_at: formatTime(room.updated_at),
    }));

    return {
      ...paginated,
      items: mappedItems
    };
  }

  findOne(id: number) {
    return this.roomRepository.findOneBy({ id: id });
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const room = await this.roomRepository.create({
      ...updateRoomDto,
      amenities: updateRoomDto.amenities?.map(id => ({ id }))
    });
    await this.roomRepository.update(id, room);
    return {
      message: "update room successfully",
    };
  }

  async remove(id: number) {
    await this.roomRepository.delete(id);
    return {
      message: "delete room successfully",
    };
  }
}
