import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/create-auth.dto';
import { Public } from '@/common/guards/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    // return loginDto;
    return this.authService.login(loginDto);
  }
}
