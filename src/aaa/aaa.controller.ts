import { Body, Controller, Delete, Get, Param, Patch, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { LoginGuard } from 'src/login.guard';
import { PermissionGuard } from 'src/permissions.guard';
import { AaaService } from './aaa.service';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';

@Controller('aaa')
export class AaaController {
  constructor(private readonly aaaService: AaaService) {}

  @Post()
  @UseGuards(LoginGuard)
  create(@Body() createAaaDto: CreateAaaDto) {
    return this.aaaService.create(createAaaDto);
  }

  @Get()
  @UseGuards(LoginGuard, PermissionGuard)
  @SetMetadata('permissions', 'query_aaa')
  findAll() {
    return this.aaaService.findAll();
  }

  @Get(':id')
  @UseGuards(LoginGuard)
  findOne(@Param('id') id: string) {
    return this.aaaService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(LoginGuard)
  update(@Param('id') id: string, @Body() updateAaaDto: UpdateAaaDto) {
    return this.aaaService.update(+id, updateAaaDto);
  }

  @Delete(':id')
  @UseGuards(LoginGuard)
  remove(@Param('id') id: string) {
    return this.aaaService.remove(+id);
  }
}
