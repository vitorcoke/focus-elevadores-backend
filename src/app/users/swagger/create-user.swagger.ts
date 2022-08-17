import { OmitType } from '@nestjs/swagger';
import { User } from '../schemas/user.schema';

export class CreateUserSwagger extends OmitType(User, ['password']) {}
