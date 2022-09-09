import { Body, Controller, Post, UseGuards } from '@nestjs/common';
// import { Request } from 'express';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { LoginDto } from './user/dtos/login.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
