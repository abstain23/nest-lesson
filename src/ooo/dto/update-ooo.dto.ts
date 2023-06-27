import { PartialType } from '@nestjs/mapped-types';
import { CreateOooDto } from './create-ooo.dto';

export class UpdateOooDto extends PartialType(CreateOooDto) {}
