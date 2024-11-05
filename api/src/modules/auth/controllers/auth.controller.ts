import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { JwtAuthGuard } from '../../../core/decorator/auth.decorator';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { Auth } from 'src/decorators';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Auth() user: JwtPayload) {
    return user;
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return await this.authService.login(loginDto);
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto): Promise<any[]> {
    return await this.authService.register(registerDto);
  }
}
