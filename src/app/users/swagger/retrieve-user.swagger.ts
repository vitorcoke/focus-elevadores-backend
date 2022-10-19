import { OmitType } from '@nestjs/swagger';
import { User } from '../schemas/user.schema';

export class RetrieveUserSwagger extends OmitType(User, ['password']) {}
