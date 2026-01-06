import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateNoticiesDto {
  @ApiProperty({ description: 'ID do usuario' })
  user_id: string;

  @ApiProperty({ description: 'Nome da fonte de notícias' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Descrição da noticia' })
  @IsNotEmpty()
  search: string;

  @ApiProperty({ description: 'Pais da notícias' })
  @IsNotEmpty()
  country: string;

  @ApiProperty({ description: 'Estado das Noticias' })
  @IsNotEmpty()
  state: string;

  @ApiProperty({ description: 'Cidade das Noticias' })
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: 'Categoria das Noticias' })
  @IsNotEmpty()
  category: string;

  @ApiProperty({ description: 'Linguagem das Noticias' })
  @IsNotEmpty()
  language: string;

  @ApiProperty({ description: 'ID das telas' })
  screen_id: string[];
}
