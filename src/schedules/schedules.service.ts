import { Injectable, Logger } from '@nestjs/common';
import { SourceRssService } from 'src/app/source-rss/source-rss.service';
import { Cron } from '@nestjs/schedule';
import * as fs from 'node:fs';

@Injectable()
export class SchedulesService {
  constructor(private readonly sourceRssService: SourceRssService) {}

  @Cron('* */5 * * *')
  async updateRss() {
    const rss = await this.sourceRssService.findAllInternal();
    if (rss.length > 0) {
      const rssFilter = rss.filter(
        (resp) => resp.urlServerRss.split('/').pop() !== '147258.json',
      );

      rssFilter.forEach((rss) => {
        fs.unlinkSync(`rss/${rss.urlServerRss.split('/').pop()}`);
      });

      Logger.log('Rss atualizado com sucesso', 'SchedulesService');
      await this.sourceRssService.createRssJSON(rssFilter);
    }
  }
}
