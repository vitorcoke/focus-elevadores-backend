import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Noticies, NoticiesDocument } from './schemas/noticies.schema';
import { Model } from 'mongoose';
import { CreateNoticiesDto } from './dto/create-noticies.dto';
import { UsersService } from '../users/users.service';
import { UserPermissions } from '../users/enums/user-permissions.enum';
import { UpdateNoticiesDto } from './dto/update-noticies.dto';

@Injectable()
export class NoticiesService {
  constructor(
    @InjectModel(Noticies.name)
    private readonly noticiesModel: Model<NoticiesDocument>,
    private readonly usersService: UsersService,
  ) {}

  async create(createNoticiesDto: CreateNoticiesDto, requestUserId: string) {
    try {
      return await this.noticiesModel.create({
        ...createNoticiesDto,
        user_id: requestUserId,
      });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findOne(id: string) {
    try {
      return await this.noticiesModel.findById(id);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findAll(requestUserId: string) {
    try {
      const user = await this.usersService.findOne({ _id: requestUserId });

      if (!user) {
        throw new InternalServerErrorException('Usuário não encontrado');
      }

      if (user.permission === UserPermissions.Admin) {
        return await this.noticiesModel.find().exec();
      }

      return await this.noticiesModel.find({ user_id: requestUserId }).exec();
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async removeScreenId(id: string) {
    try {
      const sourceRss = await this.noticiesModel.findOneAndUpdate(
        { screen_id: { $in: id } },
        { $pull: { screen_id: id } },
      );

      if (!sourceRss) throw new NotFoundException();
      return sourceRss;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async update(id: string, updateNoticiesDto: UpdateNoticiesDto) {
    try {
      const updateNoticies = await this.noticiesModel.findOneAndUpdate(
        { _id: id },
        updateNoticiesDto,
        { new: true },
      );
      return updateNoticies;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async remove(id: string) {
    try {
      return await this.noticiesModel.findByIdAndDelete(id);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async updateScreenId(id: string, screen_id: string) {
    try {
      const rss = await this.noticiesModel.findOneAndUpdate(
        {
          _id: id,
        },
        { $push: { screen_id: screen_id } },
        { new: true },
      );

      if (!rss) throw new NotFoundException();
      return rss;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
