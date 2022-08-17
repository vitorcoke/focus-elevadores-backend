import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, FilterQuery, Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UserPermissions } from './enums/user-permissions.enum';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    this.connection.on('connected', async () => {
      const users = await this.userModel.find();
      if (users.length === 0) {
        console.log('Usuário padrão criado.');
        await this.userModel.create({
          name: process.env.DB_DEFAULTUSER_NAME,
          username: process.env.DB_DEFAULTUSER_USERNAME,
          password: process.env.DB_DEFAULTUSER_PASSWORD,
          email: process.env.DB_DEFAULTUSER_EMAIL,
          permission: UserPermissions.Admin,
        });
      }
    });
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const createUser = await this.userModel.create(createUserDto);
      createUser.set('password', undefined);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findOne(filter: FilterQuery<UserDocument>, select?: string) {
    try {
      const user = await this.userModel.findOne(filter).select(select);
      if (!user) throw new NotFoundException();
      return user;
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
