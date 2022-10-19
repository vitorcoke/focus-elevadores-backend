import { PartialType } from '@nestjs/swagger';
import { CondominiumMessage } from '../schemas/condominium-message.schema';

export class UpdateCondominiumMessegeSwagger extends PartialType(
  CondominiumMessage,
) {}
