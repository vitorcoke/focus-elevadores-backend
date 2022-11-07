import { ApiProperty } from '@nestjs/swagger';

export class AlertBioAccessImoduloMessageDto {
  @ApiProperty({ description: 'ID do condominio' })
  CONDOMINIO: string;

  @ApiProperty({ description: 'Unidade do condominio' })
  UNIDADE: string;

  @ApiProperty({ description: 'Bloco do condominio' })
  BLOCO: string;
}
