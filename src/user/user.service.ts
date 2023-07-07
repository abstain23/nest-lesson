import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { LoginUserDto } from './dto/login.dto';
import { Permissions } from './entities/permissions.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectEntityManager()
  entityManager: EntityManager;

  async initData() {
    const permission1 = new Permissions();
    permission1.name = 'create_aaa';
    permission1.desc = '新增 aaa';

    const permission2 = new Permissions();
    permission2.name = 'update_aaa';
    permission2.desc = '修改 aaa';

    const permission3 = new Permissions();
    permission3.name = 'remove_aaa';
    permission3.desc = '删除 aaa';

    const permission4 = new Permissions();
    permission4.name = 'query_aaa';
    permission4.desc = '查询 aaa';

    const permission5 = new Permissions();
    permission5.name = 'create_bbb';
    permission5.desc = '新增 bbb';

    const permission6 = new Permissions();
    permission6.name = 'update_bbb';
    permission6.desc = '修改 bbb';

    const permission7 = new Permissions();
    permission7.name = 'remove_bbb';
    permission7.desc = '删除 bbb';

    const permission8 = new Permissions();
    permission8.name = 'query_bbb';
    permission8.desc = '查询 bbb';

    const user1 = new User();
    user1.username = '东东';
    user1.password = 'aaaaaa';
    user1.permissions = [permission1, permission2, permission3, permission4];

    const user2 = new User();
    user2.username = '光光';
    user2.password = 'bbbbbb';
    user2.permissions = [permission5, permission6, permission7, permission8];

    await this.entityManager.save([
      permission1,
      permission2,
      permission3,
      permission4,
      permission5,
      permission6,
      permission7,
      permission8,
    ]);
    await this.entityManager.save([user1, user2]);
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.entityManager.findOneBy(User, {
      username: loginUserDto.username,
    });

    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.ACCEPTED);
    }

    if (user.password !== loginUserDto.password) {
      throw new HttpException('密码错误', HttpStatus.ACCEPTED);
    }

    return user
  }

  async findByUsername(username: string) {
    const user = await this.entityManager.findOne(User, {
      where: {
        username,
      },
      relations: {
        permissions: true
      }
    });
    return user;
  }
}
