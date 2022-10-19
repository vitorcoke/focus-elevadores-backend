import { Module } from '@nestjs/common';
import { SourceRssService } from './source-rss.service';
import { SourceRssController } from './source-rss.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SourceRss, SourceRssSchema } from './schemas/source-rss.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SourceRss.name,
        schema: SourceRssSchema,
      },
    ]),
    UsersModule,
  ],
  providers: [SourceRssService],
  controllers: [SourceRssController],
  exports: [SourceRssService],
})
export class SourceRssModule {}
