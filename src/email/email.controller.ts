import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {

  @Inject()
  private redisService: RedisService


  constructor(private readonly emailService: EmailService) {}

  @Get('code')
  async sendEmailCode(@Query("address") address) {

    const code = Math.random().toString().slice(2,8);

    await this.redisService.set(`captcha_${address}`, code, 5 * 60);

    await this.emailService.sendMail({
      to: address,
      subject: '登录验证码',
      html: `<p>你的登录验证码是 ${code}</p>`
    });
    return '发送成功';
  }

  @Post()
  create(@Body() createEmailDto: CreateEmailDto) {
    return this.emailService.create(createEmailDto);
  }

  @Get()
  findAll() {
    return this.emailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmailDto: UpdateEmailDto) {
    return this.emailService.update(+id, updateEmailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailService.remove(+id);
  }
}
