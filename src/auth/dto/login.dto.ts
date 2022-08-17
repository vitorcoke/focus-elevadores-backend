import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Nome do usuário' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Senha' })
  @IsNotEmpty()
  password: string;
}
