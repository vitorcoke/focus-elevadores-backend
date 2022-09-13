import { Module } from '@nestjs/common';
import { AdvertisingService } from './advertising.service';
import { AdvertisingController } from './advertising.controller';
import { Advertising, AdvertisingSchema } from './schemas/advertising.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Advertising.name, schema: AdvertisingSchema },
    ]),
  ],
  providers: [AdvertisingService],
  controllers: [AdvertisingController],
})
export class AdvertisingModule {}
