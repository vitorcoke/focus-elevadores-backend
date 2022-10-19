import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBannerDto {
  @ApiProperty({ description: 'ID dos condominios' })
  user_id: string;

  @ApiProperty({ description: 'Nome do banner' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Url da imagem do banner' })
  @IsNotEmpty()
  image: string;

  @ApiProperty({ description: 'Descrição do banner' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Cor de fundo do banner' })
  @IsNotEmpty()
  background_color: string;

  @ApiProperty({ description: 'Cor da fonte do banner' })
  @IsNotEmpty()
  font_color: string;
}
