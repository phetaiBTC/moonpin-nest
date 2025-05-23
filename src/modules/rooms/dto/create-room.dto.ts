import { IsString, IsNotEmpty, IsNumber, IsOptional, IsEnum, IsArray } from "class-validator";
import { Status } from "../entities/room.entity";
export class CreateRoomDto {
    @IsString()
    @IsNotEmpty()
    room_number: string
    @IsString()
    @IsOptional()
    description?: string
    @IsNumber()
    price: number
    @IsString()
    @IsOptional()
    image: string
    @IsEnum(Status)
    @IsOptional()
    status: Status
    @IsNumber()
    bedroom: number
    @IsNumber()
    bathroom: number
    @IsNumber()
    kitchen: number
    @IsArray()
    @IsNumber({}, { each: true })
    @IsOptional()
    amenities: number[];
}
