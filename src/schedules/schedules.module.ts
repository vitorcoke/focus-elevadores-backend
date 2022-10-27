import { Module } from '@nestjs/common';
import { SourceRssModule } from 'src/app/source-rss/source-rss.module';
import { SchedulesService } from './schedules.service';

@Module({
  imports: [SourceRssModule],
  providers: [SchedulesService],
})
export class SchedulesModule {}
