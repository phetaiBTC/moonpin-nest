import { IsString, IsEmail, IsStrongPassword } from "class-validator";
export class CreateUserDto {
    @IsString()
    readonly username: string;
    @IsEmail()
    readonly email: string;
    @IsStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 0,
        minNumbers: 1,
        minSymbols: 0,
    })
    readonly password: string;
}


