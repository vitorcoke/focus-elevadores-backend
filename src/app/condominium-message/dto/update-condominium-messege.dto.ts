import { PartialType } from '@nestjs/swagger';
import { CreateCondominiumMessegeDto } from './create-condominium-messege.dto';

export class UpdateCondominiumMessegeDto extends PartialType(
  CreateCondominiumMessegeDto,
) {}
