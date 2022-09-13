import { Module } from '@nestjs/common';
import { CondominiumMessageService } from './condominium-message.service';
import { CondominiumMessageController } from './condominium-message.controller';
import {
  CondominiumMessage,
  CondominiumMessageSchema,
} from './schemas/condominium-message.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CondominiumMessage.name, schema: CondominiumMessageSchema },
    ]),
  ],
  providers: [CondominiumMessageService],
  controllers: [CondominiumMessageController],
})
export class CondominiumMessageModule {}
