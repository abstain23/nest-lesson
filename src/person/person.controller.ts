import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { PersonService } from './person.service';

@Controller('api/person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get('find')
  query(@Query('name') name: string, @Query('age') age: number) {
    console.log(typeof age);
    return `get name: ${name}, age: ${age}`;
  }

  @Get(':id')
  urlParam(@Param('id') id: string) {
    return `get id: ${id}`;
  }

  @Post() // content-type:application/x-www-form-urlencoded application/json 两种格式都能收藏
  body(@Body() createPerson: { name: string; age: number }) {
    return `get: ${JSON.stringify(createPerson)}`;
  }

  @Post('file')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads/',
    }),
  )
  body2(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    return `get file`;
  }
}
