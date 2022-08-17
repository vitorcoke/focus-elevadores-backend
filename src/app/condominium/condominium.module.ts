import { Module } from '@nestjs/common';
import { CondominiumService } from './condominium.service';
import { CondominiumController } from './condominium.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Condominium, CondominiumSchema } from './schemas/condominium.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Condominium.name, schema: CondominiumSchema },
    ]),
    UsersModule,
  ],
  providers: [CondominiumService],
  controllers: [CondominiumController],
})
export class CondominiumModule {}
