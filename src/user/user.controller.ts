import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/sign-up')
  async signUp(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }
}
