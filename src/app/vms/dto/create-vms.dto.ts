import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateVmsDto {
  @ApiProperty({ description: 'Nome do VMS' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Servidor do VMS' })
  @IsNotEmpty()
  server: string;

  @ApiProperty({ description: 'Porta do VMS' })
  @IsNotEmpty()
  port: string;

  @ApiProperty({ description: 'Usuário do VMS' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Senha do VMS' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Receptor do VMS' })
  @IsNotEmpty()
  receiver: string;

  @ApiProperty({ description: 'Conta do VMS' })
  @IsNotEmpty()
  account: string;

  @ApiProperty()
  condominium_id: string;
}
