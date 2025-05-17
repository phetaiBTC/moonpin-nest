import { IsString,IsNumber,IsNotEmpty, IsOptional, IsEnum, isNumber, isNotEmpty } from "class-validator";
import { status } from "../entities/review.entity";
export class CreateReviewDto {
    @IsNumber()
    @IsNotEmpty()
    rating:number
    @IsString()
    @IsOptional()
    comments:string
    @IsEnum(status)
    @IsOptional()
    status:status
    @IsNumber()
    @IsNotEmpty()
    hotels:number
    @IsNumber()
    @IsNotEmpty()
    users:number
    
}
