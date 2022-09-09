import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/sign-up')
  createUser(@Body() body: CreateUserDto): Promise<void> {
    return this.userService.createUser(body);
  }
}
