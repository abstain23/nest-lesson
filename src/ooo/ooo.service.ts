import { Injectable } from '@nestjs/common';
import { CreateOooDto } from './dto/create-ooo.dto';
import { UpdateOooDto } from './dto/update-ooo.dto';

@Injectable()
export class OooService {
  create(createOooDto: CreateOooDto) {
    return 'This action adds a new ooo';
  }

  findAll() {
    return `This action returns all ooo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ooo`;
  }

  update(id: number, updateOooDto: UpdateOooDto) {
    return `This action updates a #${id} ooo`;
  }

  remove(id: number) {
    return `This action removes a #${id} ooo`;
  }
}
