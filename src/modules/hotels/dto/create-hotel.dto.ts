import { BaseDatabase } from "@/common/database/BaseDatabase";
import { IsString, IsNumber, IsNotEmpty } from "class-validator";
export class CreateHotelDto {
    @IsString()
    @IsNotEmpty()
    name: string
    @IsString()
    description: string
    @IsNumber()
    rating: number
    @IsString()
    image: string
    @IsNumber()
    latitude: number
    @IsNumber()
    longitude: number
    @IsNotEmpty()
    @IsNumber()
    readonly district: number;
}
