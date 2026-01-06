import { Module } from '@nestjs/common';
import { NoticiesService } from './noticies.service';
import { NoticiesController } from './noticies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Noticies, NoticiesSchema } from './schemas/noticies.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Noticies.name, schema: NoticiesSchema },
    ]),
    UsersModule,
  ],
  providers: [NoticiesService],
  controllers: [NoticiesController],
})
export class NoticiesModule {}
