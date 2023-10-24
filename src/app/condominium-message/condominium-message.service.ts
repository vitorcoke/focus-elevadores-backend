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

      if (createCondominiumMessageDto.jpg_file) {
        const condominiumMessage = await this.CondominiumMessageModel.create({
          ...createCondominiumMessageDto,
          user_id: requestUserId,
          jpg_file: `${process.env.ULR_IMG}/api/image/${createCondominiumMessageDto.jpg_file}`,
        });

        return condominiumMessage;
      } else {
        const condominiumMessage = await this.CondominiumMessageModel.create({
          ...createCondominiumMessageDto,
          user_id: requestUserId,
        });
        return condominiumMessage;
      }
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

      if (user.permission === UserPermissions.Sindico) {
        const users = await this.userService.findAllByCondominiumId(
          user.condominium_id,
        );
        const zelador = users.filter(
          (user) => user.permission === UserPermissions.Zelador,
        );

        return await this.CondominiumMessageModel.find({
          user_id: { $in: [...zelador.map((user) => user._id), requestUserId] },
        });
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
      if (updateCondominiumMessageDto.jpg_file) {
        const condominiumMessage =
          await this.CondominiumMessageModel.findOneAndUpdate(
            { _id: id },
            {
              ...updateCondominiumMessageDto,
              jpg_file: `${process.env.ULR_IMG}/api/image/${updateCondominiumMessageDto.jpg_file}`,
            },
            { new: true },
          );
        if (!condominiumMessage) throw new NotFoundException();
        return condominiumMessage;
      }

      const condominiumMessage =
        await this.CondominiumMessageModel.findOneAndUpdate(
          { _id: id },
          {
            updateCondominiumMessageDto,
          },
          { new: true },
        );
      if (!condominiumMessage) throw new NotFoundException();
      return condominiumMessage;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async updateScreenId(id: string, screen_id: string) {
    try {
      const condominiumMessage =
        await this.CondominiumMessageModel.findOneAndUpdate(
          {
            _id: id,
          },
          { $push: { screen_id: screen_id } },
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

  async removeScreenId(id: string) {
    try {
      const condominiumMessage =
        await this.CondominiumMessageModel.findOneAndUpdate(
          { screen_id: { $in: id } },
          { $pull: { screen_id: id } },
        );

      return condominiumMessage;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
