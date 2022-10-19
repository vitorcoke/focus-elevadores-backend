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

  @ApiProperty({ description: 'CEP do condominio' })
  @IsNotEmpty()
  cep: string;

  @ApiProperty({ description: 'Endereço do condominio' })
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Bairro do condominio' })
  @IsNotEmpty()
  district: string;

  @ApiPropertyOptional({ description: 'Complemento do condominio' })
  complement: string;

  @ApiProperty({ description: 'Cidade do condominio' })
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: 'Estado do condominio' })
  @IsNotEmpty()
  state: string;

  @ApiPropertyOptional({ description: 'Telas do condominio' })
  screens: string[];
}
