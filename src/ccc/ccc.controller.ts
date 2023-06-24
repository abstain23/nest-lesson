import {
  BeforeApplicationShutdown,
  Body,
  Controller,
  Delete,
  Get,
  OnApplicationBootstrap,
  OnModuleDestroy,
  OnModuleInit,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CccService } from './ccc.service';
import { CreateCccDto } from './dto/create-ccc.dto';
import { UpdateCccDto } from './dto/update-ccc.dto';

@Controller('ccc')
export class CccController
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown
{
  constructor(private readonly cccService: CccService) {}

  onModuleInit() {
    console.log('ccc controller moduleInit');
  }

  onApplicationBootstrap() {
    console.log('ccc controller onApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('ccc controller onModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('ccc controller beforeApplicationShutdown', signal);
  }

  @Post()
  create(@Body() createCccDto: CreateCccDto) {
    return this.cccService.create(createCccDto);
  }

  @Get()
  findAll() {
    return this.cccService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cccService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCccDto: UpdateCccDto) {
    return this.cccService.update(+id, updateCccDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cccService.remove(+id);
  }
}
