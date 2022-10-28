import { ApiProperty } from '@nestjs/swagger';

export class CreateImoduloMessageDto {
  @ApiProperty({ description: 'Condominium ID' })
  condominiun_id: number;

  @ApiProperty({ description: 'Unidade' })
  unity: string;

  @ApiProperty({ description: 'Bloco' })
  block: string;

  @ApiProperty({ description: 'Tipo' })
  type: string;

  @ApiProperty({ description: 'Mensagem' })
  message: string;

  @ApiProperty({ description: 'ID da mensagem' })
  message_id: string;

  @ApiProperty({ description: 'Data' })
  date: Date;
}
