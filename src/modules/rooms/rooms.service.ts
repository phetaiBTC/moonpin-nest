import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { formatTime } from '@/utils/formatTime';
import { AmenitiesService } from '../amenities/amenities.service';
@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    private amenitiesService: AmenitiesService
  ) { }
  async create(createRoomDto: CreateRoomDto, hotelId: number) {
    const amenities = await this.amenitiesService.findByHotelId(hotelId);
    const hotelAmenityIds = amenities.map(a => a.id);
    const invalidAmenityIds = createRoomDto.amenities.filter(id => !hotelAmenityIds.includes(id));
    if (invalidAmenityIds.length > 0) {
      throw new NotFoundException(`Amenity not found in this hotel`);
    }
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


  async findAll(options: IPaginationOptions, hotelId: number) {
    const queryBuilder = this.roomRepository.createQueryBuilder('room')
      .leftJoinAndSelect('room.amenities', 'amenities')
      .leftJoinAndSelect('room.hotel', 'hotel')
      .where('hotel.id = :hotelId', { hotelId })
      .orderBy('room.created_at', 'DESC')
      .distinct(true); // ป้องกันแถวซ้ำ

    const paginated = await paginate(queryBuilder, options);

    const mappedItems = paginated.items.map((room) => ({
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
      items: mappedItems,
    };
  }


  findOne(id: number) {
    return this.roomRepository.findOneBy({ id: id });
  }

  async update(id: number, updateRoomDto: UpdateRoomDto, hotelId: number) {
    const existingRoom = await this.roomRepository.findOne({
      where: { id },
      relations: ['amenities', 'hotel'], // ดึง relation มาด้วย
    });

    if (!existingRoom) {
      throw new NotFoundException('Room not found');
    }

    const updatedRoom = {
      ...existingRoom,
      ...updateRoomDto,
      amenities: updateRoomDto.amenities?.map(id => ({ id })) || [],
      hotel: { id: hotelId },
    };

    await this.roomRepository.save(updatedRoom);

    return {
      message: "Update room successfully",
    };
  }


  async remove(id: number) {
    await this.roomRepository.delete(id);
    return {
      message: "delete room successfully",
    };
  }
}
