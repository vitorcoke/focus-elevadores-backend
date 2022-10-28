import { ApiProperty } from '@nestjs/swagger';

export class AlertBioAccessImoduloMessageDto {
  @ApiProperty({ description: 'ID do condominio' })
  condominio_id: string;

  @ApiProperty({ description: 'Unidade do condominio' })
  unity: string;

  @ApiProperty({ description: 'Bloco do condominio' })
  block: string;
}
