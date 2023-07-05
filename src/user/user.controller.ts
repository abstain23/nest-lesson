import { Body, Controller, Inject, Post, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @Post('login')
  async login(@Body(ValidationPipe) user: LoginDto) {
    const loginUser = await this.userService.login(user);
    if (loginUser) {
      const token = await this.jwtService.signAsync({
        user: {
          id: loginUser.id,
          username: loginUser.username,
        },
      });
      return {
        code: 0,
        msg: 'login ok',
        token,
      };
    }
    return {
      code: -1,
      msg: 'login fail',
    };
  }

  @Post('register')
  async register(@Body(ValidationPipe) user: RegisterDto) {
    await this.userService.register(user);
    return {
      code: 0,
      msg: 'success',
    };
  }
}
