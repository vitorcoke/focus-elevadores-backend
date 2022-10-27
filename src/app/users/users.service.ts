import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, FilterQuery, Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPermissions } from './enums/user-permissions.enum';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    if (this.connection.readyState === 1) {
      this.userModel.find().then((users) => {
        if (users.length === 0) {
          console.log('Usuário padrão criado.');
          this.userModel.create({
            name: process.env.DB_DEFAULTUSER_NAME,
            username: process.env.DB_DEFAULTUSER_USERNAME,
            password: process.env.DB_DEFAULTUSER_PASSWORD,
            email: process.env.DB_DEFAULTUSER_EMAIL,
            phone: process.env.DB_DEFAULTUSER_PHONE,
            permission: UserPermissions.Admin,
          });
        }
      });
    }
  }

  async create(createUserDto: CreateUserDto, requestUserId: string) {
    try {
      const user = await this.userModel.findOne({
        _id: requestUserId,
      });

      if (!user) throw new NotFoundException();

      const createUser = await this.userModel.create({
        ...createUserDto,
        user_id: requestUserId,
      });
      createUser.set('password', undefined);
      return createUser;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  //Retorna todos os usuarios, menos o usuario que fez a requisicao
  async findAll(requestUserId: string) {
    try {
      const user = await this.userModel.findOne({ _id: requestUserId });
      if (!user) throw new NotFoundException();

      if (user.permission === UserPermissions.Admin) {
        const users = await this.userModel.find({
          _id: { $ne: requestUserId },
        });
        return users;
      }

      const users = await this.userModel.find({
        _id: { $ne: requestUserId },
        user_id: user._id,
      });
      return users;
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      if (updateUserDto.password) {
        const hashPassword = await bcrypt.hash(updateUserDto.password, 10);
        const updateUser = await this.userModel.findOneAndUpdate(
          { _id: id },
          { ...updateUserDto, password: hashPassword },
          { new: true },
        );
        if (!updateUser) throw new NotFoundException();
        updateUser.set('password', undefined);
        return updateUser;
      }
      const updateUser = await this.userModel.findOneAndUpdate(
        { _id: id },
        updateUserDto,
        { new: true },
      );
      if (!updateUser) throw new NotFoundException();
      updateUser.set('password', undefined);
      return updateUser;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async removeCondominium(condominiumId: string) {
    try {
      const users = await this.userModel.find({
        condominium_id: { $in: condominiumId },
      });

      if (users.length > 0) {
        users.forEach(async (user) => {
          const index = user.condominium_id.indexOf(condominiumId);
          if (index > -1) {
            user.condominium_id.splice(index, 1);
          }
          await user.updateOne(user);
        });
      }
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async remove(id: string) {
    try {
      const user = await this.userModel.findByIdAndDelete(id);
      if (!user) throw new NotFoundException();
      return user;
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
