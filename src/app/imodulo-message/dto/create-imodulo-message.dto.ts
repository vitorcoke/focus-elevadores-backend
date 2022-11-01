import { ApiProperty } from '@nestjs/swagger';

export class CreateImoduloMessageDto {
  @ApiProperty({ description: 'Condominium ID' })
  CONDOMINIO: number;

  @ApiProperty({ description: 'Unidade' })
  UNIDADE: string;

  @ApiProperty({ description: 'Bloco' })
  BLOCO: string;

  @ApiProperty({ description: 'Tipo' })
  TIPO: string;

  @ApiProperty({ description: 'Mensagem' })
  MENSAGEM: string;

  @ApiProperty({ description: 'ID da mensagem' })
  ID_MENSAGEM: string;

  @ApiProperty({ description: 'Data' })
  DATA: Date;
}
