import {
  ArgumentMetadata,
  BadRequestException,
  Inject,
  Injectable,
  Optional,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class MyValidationPipe implements PipeTransform<any> {
  @Optional()
  @Inject('validation_options') // 如果要使用这里的依赖注入 那么就不能使用new，应该直接传入类
  private options: any;

  async transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata) {
      return value;
    }
    console.log('this.options', this.options);
    console.log('value', value);
    console.log('metadata', metadata);
    const object = plainToInstance(metadata.metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      console.log('errors', errors);
      throw new BadRequestException('参数验证失败');
    }
    return value;
  }
}
