import { Module } from '@nestjs/common';
import { AdvertisingService } from './advertising.service';
import { AdvertisingController } from './advertising.controller';

@Module({
  providers: [AdvertisingService],
  controllers: [AdvertisingController]
})
export class AdvertisingModule {}
