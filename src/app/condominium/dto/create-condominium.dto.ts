import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateCondominiumDto {
  @ApiProperty({ description: 'Nome do condominio' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'CNPJ do comdomino' })
  @IsNotEmpty()
  @Length(14, 14)
  cnpj: number;

  @ApiProperty({ description: 'Endereço do condominio' })
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Bairro do condominio' })
  @IsNotEmpty()
  district: string;

  @ApiProperty({ description: 'Complemento do condominio' })
  @IsNotEmpty()
  complement: string;

  @ApiProperty({ description: 'Cidade do condominio' })
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: 'Estado do condominio' })
  @IsNotEmpty()
  state: string;

  @ApiPropertyOptional({ description: 'Telas do condominio' })
  @IsNotEmpty()
  screens: string[];
}
