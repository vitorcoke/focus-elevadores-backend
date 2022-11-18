import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSourceRssDto {
  @ApiProperty({ description: 'ID dos condominios' })
  user_id: string;

  @ApiProperty({ description: 'Nome da fonte de notícias' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'URL da fonte de notícias' })
  @IsNotEmpty()
  url: string;

  @ApiProperty({ description: 'Logotipo da fonte de notícias' })
  @IsNotEmpty()
  logotipo: string;

  @ApiProperty({ description: 'URL do servidor de RSS' })
  urlServerRss: string;

  @ApiProperty({ description: 'ID das telas' })
  screen_id: string[];
}
