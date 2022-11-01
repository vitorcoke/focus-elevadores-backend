import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVmsDto } from './dto/create-vms.dto';
import { UpdateVmsDto } from './dto/update-vms.dto';
import { Vms, VmsDocument } from './schema/vms.schema';

@Injectable()
export class VmsService {
  constructor(
    @InjectModel(Vms.name)
    private readonly vmsModel: Model<VmsDocument>,
  ) {}

  async create(createVmsDto: CreateVmsDto) {
    try {
      const vms = await this.vmsModel.create(createVmsDto);

      return vms;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findAll() {
    try {
      const vms = await this.vmsModel.find();

      return vms;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  findByCondominiumId(condominiumId: string) {
    try {
      const vms = this.vmsModel.find({ condominium_id: condominiumId });
      return vms;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async update(id: string, updateVmsDto: UpdateVmsDto) {
    try {
      const vms = await this.vmsModel.findByIdAndUpdate(id, updateVmsDto, {
        new: true,
      });

      return vms;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async remove(id: string) {
    try {
      const vms = await this.vmsModel.findByIdAndDelete(id);

      return vms;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
