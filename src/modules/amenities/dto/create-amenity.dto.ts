import { IsString, IsNotEmpty, IsNumber } from "class-validator";
export class CreateAmenityDto {
    @IsString()
    @IsNotEmpty()
    name: string
}
