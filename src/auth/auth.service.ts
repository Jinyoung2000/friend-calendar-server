import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/user/dtos/login.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(account: LoginDto) {
    const user = await this.userService.findOne(account.email);
    if (!user) {
      throw new NotFoundException();
    }
    const isPasswordValid = await compare(account.password, user.password);
    if (user && isPasswordValid) {
      const { email, name } = user;
      return {
        email,
        name,
      };
    }
    return null;
  }

  async login(account: LoginDto) {
    const user = await this.userService.findOne(account.email);
    const payload = {
      id: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      name: user.name,
      email: user.email,
    };
  }
}
