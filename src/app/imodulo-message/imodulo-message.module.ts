import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ImoduloMessageService } from './imodulo-message.service';
import { ImoduloMessageController } from './imodulo-message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ImoduloMessage,
  ImoduloMessageSchema,
} from './schema/imodulo-message.schema';
import { IModuleMessageMiddleware } from './middleware/imodule-message.middleware';
import { ImoduloMessageGateway } from './imodulo-message.gateway';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ImoduloMessage.name,
        schema: ImoduloMessageSchema,
      },
    ]),
  ],
  providers: [ImoduloMessageService, ImoduloMessageGateway],
  controllers: [ImoduloMessageController],
})
export class ImoduloMessageModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IModuleMessageMiddleware)
      .forRoutes(ImoduloMessageController);
  }
}
