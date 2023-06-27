import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { MyFileValidator } from './MyFileValidator';
import { AppService } from './app.service';
import { FileSizeValidationPipePipe } from './file-size-validation-pipe.pipe';
import { storage } from './storage';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    debugger;
    return this.appService.getHello();
  }

  @Post('aaa')
  @UseInterceptors(
    FileInterceptor('aaa', {
      dest: 'uploads',
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    console.log('body', body);
    console.log('file', file);
    return body;
  }

  @Post('bbb')
  @UseInterceptors(
    FilesInterceptor('bbb', 3, {
      dest: 'uploads',
    }),
  )
  uploadFiles(@UploadedFiles() files: Express.Multer.File[], @Body() body) {
    console.log('body', body);
    console.log('file', files);
    return body;
  }

  @Post('ccc')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'aaa', maxCount: 2 },
        { name: 'bbb', maxCount: 3 },
      ],
      { dest: 'uploads' },
    ),
  )
  uploadFileFields(
    @UploadedFiles()
    files: { aaa?: Express.Multer.File[]; bbb?: Express.Multer.File[] },
    @Body() body,
  ) {
    console.log('body', body);
    console.log('files', files);
    return body;
  }

  @Post('ddd')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: storage,
    }),
  )
  uploadAnyFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    console.log('body', body);
    console.log('files', files);
    return body;
  }

  @Post('eee')
  @UseInterceptors(
    FileInterceptor('aaa', {
      dest: 'uploads',
    }),
  )
  uploadFie2(
    @UploadedFile(FileSizeValidationPipePipe) file: Express.Multer.File,
    @Body() body,
  ) {
    console.log('body', body);
    console.log('files', file);
    return body;
  }

  @Post('fff')
  @UseInterceptors(
    FileInterceptor('aaa', {
      dest: 'uploads',
    }),
  )
  uploadFie3(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({
            fileType: 'image/jpeg',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body,
  ) {
    console.log('body', body);
    console.log('files', file);
    return body;
  }

  @Post('hhh')
  @UseInterceptors(
    FileInterceptor('aaa', {
      dest: 'uploads',
    }),
  )
  uploadFile4(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MyFileValidator({})],
      }),
    )
    file: Express.Multer.File,
    @Body() body,
  ) {
    console.log('body', body);
    console.log('files', file);
    return body;
  }
}
