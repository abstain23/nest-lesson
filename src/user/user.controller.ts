import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { LoginUserDto } from './dto/login.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('init')
  async init() {
    await this.userService.initData();
    return 'done';
  }

  @Post('login')
  async login(@Body() loginUser: LoginUserDto, @Session() session) {
  
    const user = await this.userService.login(loginUser);

    session.user = {
      username: user.username
    }

    return 'success';
  }
}
