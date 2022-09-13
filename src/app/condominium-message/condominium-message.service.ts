import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  CondominiumMessage,
  CondominiumMessageDocument,
} from './schemas/condominium-message.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CondominiumMessageService {
  constructor(
    @InjectModel(CondominiumMessage.name)
    private readonly CondominiumMessageModel: Model<CondominiumMessageDocument>,
  ) {}
}
