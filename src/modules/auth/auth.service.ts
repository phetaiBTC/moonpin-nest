import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import *as bcryptjs from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private usersService: UsersService) { }
  async validateUser(loginDto: LoginDto): Promise<any> {
    const user = await this.usersService.findOneByEmail(loginDto.email);
    if (!user) {
      throw new NotFoundException("user notfound")
    }

    const isMatch = await bcryptjs.compare(loginDto.password, user.password)
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    // console.log(user.hotels.id);
    const payload = { email: user.email, sub: user.id, username: user.id, hotel: user.hotels ? user.hotels.id : null };
    // console.log(payload);
    return {
      message: "Login successfully",
      access_token: this.jwtService.sign(payload),
    };
  }

  async profile(id: number) {
    const user = await this.usersService.findOne(id);
    // console.log(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
