import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/sign-up')
  async createUser(@Body() body: CreateUserDto): Promise<void> {
    return this.userService.createUser(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':email')
  async getUser(@Param('email') email: string) {
    return this.userService.findUserByEmail(email);
  }
}