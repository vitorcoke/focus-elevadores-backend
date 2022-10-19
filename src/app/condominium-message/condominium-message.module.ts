import { Module } from '@nestjs/common';
import { CondominiumMessageService } from './condominium-message.service';
import { CondominiumMessageController } from './condominium-message.controller';
import {
  CondominiumMessage,
  CondominiumMessageSchema,
} from './schemas/condominium-message.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CondominiumMessage.name, schema: CondominiumMessageSchema },
    ]),
    UsersModule,
  ],
  providers: [CondominiumMessageService],
  controllers: [CondominiumMessageController],
})
export class CondominiumMessageModule {}
