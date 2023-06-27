import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MyValidationPipe } from 'src/my-validation.pipe';
import { CreateOooDto } from './dto/create-ooo.dto';
import { UpdateOooDto } from './dto/update-ooo.dto';
import { OooService } from './ooo.service';

@Controller('ooo')
export class OooController {
  constructor(private readonly oooService: OooService) {}

  @Post()
  create(@Body(MyValidationPipe) createOooDto: CreateOooDto) {
    console.log('createOooDto', createOooDto);
    return createOooDto;
  }

  @Post('2')
  create2(@Body() createOooDto: CreateOooDto) {
    console.log('createOooDto2', createOooDto);
    return createOooDto;
  }

  @Get()
  findAll() {
    return this.oooService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oooService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOooDto: UpdateOooDto) {
    return this.oooService.update(+id, updateOooDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oooService.remove(+id);
  }
}
