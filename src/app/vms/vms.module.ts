import { Module } from '@nestjs/common';
import { VmsService } from './vms.service';
import { VmsController } from './vms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Vms, VmsSchema } from './schema/vms.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Vms.name,
        schema: VmsSchema,
      },
    ]),
  ],
  providers: [VmsService],
  controllers: [VmsController],
})
export class VmsModule {}
