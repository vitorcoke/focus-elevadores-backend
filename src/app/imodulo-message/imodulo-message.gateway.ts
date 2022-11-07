import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { AlertBioAccessImoduloMessageDto } from './dto/alert-bio-imodulo-message.dto';
import { ImoduloMessageService } from './imodulo-message.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    allowedHeaders: '*',
    methods: '*',
  },
})
export class ImoduloMessageGateway {
  constructor(private readonly imoduloMessageService: ImoduloMessageService) {}

  @WebSocketServer() server;

  async handleMessage(filter: AlertBioAccessImoduloMessageDto) {
    const message = await this.imoduloMessageService.findOne({
      condominiun_id: filter.CONDOMINIO,
      unity: filter.UNIDADE,
      block: filter.BLOCO,
    });

    console.log(filter);

    console.log(message);

    if (message !== null) {
      return this.server.emit('alert-bio-access', message);
    }
  }
}
