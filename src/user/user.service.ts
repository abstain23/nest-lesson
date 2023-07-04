import { Injectable } from '@nestjs/common';
import {
  InjectDataSource,
  InjectEntityManager,
  InjectRepository,
} from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  // 注入EntityManager 需要每次调用时带上Entity
  @InjectEntityManager()
  private manager: EntityManager;

  // 在imports中引入 TypeOrmModule.forFeature([Entity])
  @InjectRepository(User)
  private userRepository: Repository<User>;

  // 直接注入dataSource
  @InjectDataSource()
  private dataSource: DataSource;

  create(createUserDto: CreateUserDto) {
    this.manager.save(User, createUserDto);
  }

  findAll() {
    // return this.manager.find(User);
    // this.dataSource.getRepository(User).find()
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.manager.findOne(User, {
      where: {
        id,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.manager.save(User, {
      id,
      ...updateUserDto,
    });
  }

  remove(id: number) {
    // this.userRepository.delete(id)
    return this.manager.delete(User, id);
  }
}
