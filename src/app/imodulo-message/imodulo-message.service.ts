import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
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
      const imoduloMessage = await this.imoduloMessageModel.create({
        condominiun_id: createImoduloMessageDto.CONDOMINIO,
        unity: createImoduloMessageDto.UNIDADE,
        block: createImoduloMessageDto.BLOCO,
        type: createImoduloMessageDto.TIPO,
        message: createImoduloMessageDto.MENSAGEM,
        message_id: createImoduloMessageDto.ID_MENSAGEM,
        date: createImoduloMessageDto.DATA,
      });

      return imoduloMessage;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findOne(filter: FilterQuery<ImoduloMessageDocument>) {
    try {
      const imoduloMessage = await this.imoduloMessageModel.findOne(filter);

      return imoduloMessage;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
