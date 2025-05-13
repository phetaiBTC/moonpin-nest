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
    @IsString()
    latitude: number
    @IsString()
    longitude: number
}
