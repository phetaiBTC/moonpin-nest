import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private usersService: UsersService) { }
  async validateUser(loginDto: LoginDto): Promise<any> {
    const user = await this.usersService.findOneByEmail(loginDto.email);
    if (user && user.password === loginDto.password) {
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
    const payload = { email: user.email, sub: user.id, username: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
