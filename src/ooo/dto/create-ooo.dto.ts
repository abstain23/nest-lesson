import {
  Contains,
  IsEmail,
  IsFQDN,
  IsInt,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateOooDto {
  name: string;
  @IsInt({
    message(validationArguments) {
      console.log('validationArguments', validationArguments);
      return 'age 必须是整数';
    },
  })
  @Min(1, {
    message() {
      return 'age 必须大于0';
    },
  })
  age: number;
  sex: boolean;
  hobbies: Array<string>;
}

export class Dto2 {
  @Length(10, 20)
  title: string;

  @Contains('hello')
  text: string;

  @IsInt()
  @Min(0)
  @Max(10)
  rating: number;

  @IsEmail()
  email: string;

  @IsFQDN()
  site: string;
}
