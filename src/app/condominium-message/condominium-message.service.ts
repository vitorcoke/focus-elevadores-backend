import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import {
  CondominiumMessage,
  CondominiumMessageDocument,
} from './schemas/condominium-message.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCondominiumMessegeDto } from './dto/create-condominium-messege.dto';
import { UsersService } from '../users/users.service';
import { UserPermissions } from '../users/enums/user-permissions.enum';
import { UpdateCondominiumMessegeDto } from './dto/update-condominium-messege.dto';

@Injectable()
export class CondominiumMessageService {
  constructor(
    @InjectModel(CondominiumMessage.name)
    private readonly CondominiumMessageModel: Model<CondominiumMessageDocument>,
    private readonly userService: UsersService,
  ) {}

  async create(
    createCondominiumMessageDto: CreateCondominiumMessegeDto,
    requestUserId: string,
  ) {
    try {
      const user = await this.userService.findOne({ _id: requestUserId });

      if (!user) throw new NotFoundException('Usuário não encontrado');
      const condominiumMessage = await this.CondominiumMessageModel.create({
        ...createCondominiumMessageDto,
        user_id: requestUserId,
      });
      return condominiumMessage;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findAll(requestUserId: string) {
    try {
      const user = await this.userService.findOne({ _id: requestUserId });

      if (!user) throw new NotFoundException('Usuário não encontrado');

      if (user.permission === UserPermissions.Admin) {
        return await this.CondominiumMessageModel.find();
      }

      return await this.CondominiumMessageModel.find({
        user_id: { $in: user._id },
      });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async update(
    id: string,
    updateCondominiumMessageDto: UpdateCondominiumMessegeDto,
  ) {
    try {
      const condominiumMessage =
        await this.CondominiumMessageModel.findOneAndUpdate(
          { _id: id },
          updateCondominiumMessageDto,
          { new: true },
        );
      if (!condominiumMessage) throw new NotFoundException();
      return condominiumMessage;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findOne(id: string) {
    try {
      const condominiumMessage = await this.CondominiumMessageModel.findOne({
        _id: id,
      });
      if (!condominiumMessage) throw new NotFoundException();
      return condominiumMessage;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async remove(id: string) {
    try {
      const condominiumMessage =
        await this.CondominiumMessageModel.findByIdAndDelete(id);
      if (!condominiumMessage) throw new NotFoundException();
      return condominiumMessage;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
