import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserService } from './user.service';

import { JwtService } from '@nestjs/jwt';
import { RequireLogin } from 'src/custom-decorator';

@Controller('user')
@RequireLogin(false)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private jwtService: JwtService

  @Get('init') 
  async init() {
    await this.userService.initData()
    return 'ok'
  }

  @Post('login')
  @RequireLogin(true)
  async login(@Body() loginUser: UserLoginDto) {
    const user = await this.userService.login(loginUser)
    const token = await this.jwtService.signAsync({
      user: {
        username: user.username,
        roles: user.roles
      }
    })
    return {
      token
    }
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
