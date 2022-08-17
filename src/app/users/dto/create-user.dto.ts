import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome real do usuario' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Nome do usuário para logar na aplicação' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Email do usuário' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Permissão do usuário', minimum: 0, maximum: 2 })
  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1, 2])
  permission: number;
}
