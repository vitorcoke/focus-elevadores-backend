import { OmitType } from '@nestjs/swagger';
import { User } from '../schemas/user.schema';

export class UpdateUserSwagger extends OmitType(User, ['password']) {}
