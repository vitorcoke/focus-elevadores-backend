import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateImoduloMessageDto } from './dto/create-imodulo-message.dto';
import {
  ImoduloMessage,
  ImoduloMessageDocument,
} from './schema/imodulo-message.schema';

@Injectable()
export class ImoduloMessageService {
  constructor(
    @InjectModel(ImoduloMessage.name)
    private readonly imoduloMessageModel: Model<ImoduloMessageDocument>,
  ) {}

  async create(createImoduloMessageDto: CreateImoduloMessageDto) {
    try {
      const imoduloMessage = await this.imoduloMessageModel.create(
        createImoduloMessageDto,
      );

      return imoduloMessage;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
