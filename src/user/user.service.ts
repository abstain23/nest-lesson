import { HttpException, Injectable, Logger } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from './entities/user.entity';

function md5(str: string) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

@Injectable()
export class UserService {
  private logger = new Logger();

  @InjectRepository(User)
  private userRepository: Repository<User>;

  async register(user: RegisterDto) {
    const findUser = await this.userRepository.findOneBy({
      username: user.username,
    });

    if (findUser) {
      throw new HttpException('用户已经存在', 200);
    }

    const newUser = new User();

    Object.assign(newUser, user);

    newUser.password = md5(user.password);

    try {
      await this.userRepository.save(newUser);
      return '注册成功';
    } catch (e) {
      this.logger.error(e, UserService);
      return '注册失败';
    }
  }

  async login(user: LoginDto) {
    const findUser = await this.userRepository.findOneBy({
      username: user.username,
    });

    if (!findUser) {
      throw new HttpException(`${user.username}不存在`, 400);
    }

    if (findUser.password !== md5(user.password)) {
      throw new HttpException('密码错误', 200);
    }

    return findUser;
  }
}
