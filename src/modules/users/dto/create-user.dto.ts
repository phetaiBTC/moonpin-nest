import { IsEmail, IsString, IsNotEmpty, IsEnum, IsNumber } from "class-validator";
import { Gender } from "../entities/user.entity";
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    readonly phone: string;

    @IsEnum(Gender)
    @IsNotEmpty()
    readonly gender: Gender;

    @IsNotEmpty()
    @IsNumber()
    readonly district: number;
}
