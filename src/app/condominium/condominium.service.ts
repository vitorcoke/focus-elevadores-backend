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
      const condominium = await this.condominiumModel.create(
        createCondominiumDto,
      );
      if (!condominium) throw new NotFoundException();
      return condominium;
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

      if (queryAll && requestUser.permission === UserPermissions.Admin)
        return this.condominiumModel.find();
      else
        return this.condominiumModel.find({
          _id: { $in: requestUser.condominium_id },
        });
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

  async remove(id: string) {
    try {
      const deleteCondominiun = await this.condominiumModel.findOneAndDelete({
        _id: id,
      });
      if (!deleteCondominiun) throw new NotFoundException();
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
