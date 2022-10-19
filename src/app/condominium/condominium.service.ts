import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPermissions } from '../users/enums/user-permissions.enum';
import { UsersService } from '../users/users.service';
import { CreateCondominiumDto } from './dto/create-condominium.dto';
import { UpdateCondominiumDto } from './dto/update-condominium.dto';
import { Condominium, CondominiumDocument } from './schemas/condominium.schema';

@Injectable()
export class CondominiumService {
  constructor(
    @InjectModel(Condominium.name)
    private readonly condominiumModel: Model<CondominiumDocument>,
    private readonly usersService: UsersService,
  ) {}

  async create(createCondominiumDto: CreateCondominiumDto) {
    try {
      return await this.condominiumModel.create(createCondominiumDto);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findAll(queryAll: boolean, requestUserId: string) {
    try {
      const requestUser = await this.usersService.findOne(
        { _id: requestUserId },
        'condominium_id permission',
      );

      if (queryAll && requestUser.permission === UserPermissions.Admin) {
        return this.condominiumModel.find();
      }

      return this.condominiumModel.find({
        _id: { $in: requestUser.condominium_id },
      });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findAllInternal() {
    try {
      return this.condominiumModel.find();
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findOne(id: string) {
    try {
      const condominium = await this.condominiumModel.findOne({ _id: id });
      if (!condominium) throw new NotFoundException();
      return condominium;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async update(id: string, updateCondominiumDto: UpdateCondominiumDto) {
    try {
      const updateCondominium = await this.condominiumModel.findOneAndUpdate(
        { _id: id },
        updateCondominiumDto,
        { new: true },
      );

      if (!updateCondominium) throw new NotFoundException();
      return updateCondominium;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async removeScreensFromCondominium(condominiumId: string, screenId: string) {
    try {
      const condominium = await this.findOne(condominiumId);
      if (!condominium) throw new NotFoundException();

      const screens = condominium.screens.filter(
        (screen) => screen != screenId,
      );

      await this.condominiumModel.findOneAndUpdate(
        { _id: condominiumId },
        { screens },
        { new: true },
      );
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async remove(id: string) {
    try {
      const deleteCondominiun = await this.condominiumModel.deleteMany({
        _id: id,
      });
      if (!deleteCondominiun) throw new NotFoundException();
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
