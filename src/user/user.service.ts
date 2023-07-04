import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private userManager: EntityManager;

  create(createUserDto: CreateUserDto) {
    this.userManager.save(User, createUserDto);
  }

  findAll() {
    return this.userManager.find(User);
  }

  findOne(id: number) {
    return this.userManager.findOne(User, {
      where: {
        id,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.userManager.save(User, {
      id,
      ...updateUserDto,
    });
  }

  remove(id: number) {
    return this.userManager.delete(User, id);
  }
}
