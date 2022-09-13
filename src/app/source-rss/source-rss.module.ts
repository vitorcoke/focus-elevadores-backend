import { Module } from '@nestjs/common';
import { SourceRssService } from './source-rss.service';
import { SourceRssController } from './source-rss.controller';

@Module({
  providers: [SourceRssService],
  controllers: [SourceRssController],
})
export class SourceRssModule {}
