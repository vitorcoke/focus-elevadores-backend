import { Injectable } from '@nestjs/common';
import { SourceRssService } from 'src/app/source-rss/source-rss.service';
import { Cron } from '@nestjs/schedule';
import * as fs from 'node:fs';

@Injectable()
export class SchedulesService {
  constructor(private readonly sourceRssService: SourceRssService) {}

  @Cron('0 0 * * 0')
  async updateRss() {
    const rss = await this.sourceRssService.findAllInternal();
    if (rss.length > 0) {
      rss.forEach((rss) => {
        fs.unlinkSync(`rss/${rss.urlServerRss.split('/').pop()}`);
      });
      await this.sourceRssService.createRssJSON(rss);
    }
  }
}
