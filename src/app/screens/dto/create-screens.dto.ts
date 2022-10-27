import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateScreensDto {
  @ApiProperty({ description: 'ID do usuario que criou a tela' })
  user_id: string;

  @ApiProperty({ description: 'Nome da tela' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Validade da tela' })
  @IsNotEmpty()
  validity: Date;

  @ApiPropertyOptional({ description: 'Fonte RSS da tela' })
  source_rss?: string[];

  @ApiPropertyOptional({ description: 'Banner da tela' })
  banner?: string;

  @ApiPropertyOptional({ description: 'Anúncios da tela' })
  advertising?: string[];

  @ApiPropertyOptional({ description: 'Mensagens do condomínio' })
  condominium_message?: string[];

  @ApiProperty({ description: 'ID do condomínio' })
  @IsNotEmpty()
  condominium_id: string;

  @ApiProperty({ description: 'Estado da tela' })
  @IsNotEmpty()
  state: string;

  @ApiProperty({ description: 'Cidade da tela' })
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: 'ID imodulo do condominio' })
  @IsNotEmpty()
  condominium_id_imodulo: number;
}
