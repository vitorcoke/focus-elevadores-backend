import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ImoduloMessageService } from './imodulo-message.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ImoduloMessageGateway {
  constructor(private readonly imoduloMessageService: ImoduloMessageService) {}

  @WebSocketServer() server;

  async handleMessage(filter: any) {
    const message = await this.imoduloMessageService.findOne({
      condominiun_id: filter.condominio_id,
      unity: filter.unity,
      block: filter.block,
    });

    if (message !== null) {
      return this.server.emit('alert-bio-access', message);
    }
  }
}
