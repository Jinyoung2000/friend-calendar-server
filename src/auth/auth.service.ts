import { Injectable, Logger } from '@nestjs/common';
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
    if (user && compare(user.password, account.password)) {
      const { id, password, ...userInfo } = user;
      return userInfo;
    }
    return null;
  }

  async login(account: LoginDto) {
    const payload = {
      email: account.email,
      password: account.password,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
