import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseSwagger {
  @ApiProperty({ description: 'Usuário autenticado.' })
  user: string;

  @ApiProperty({ description: 'Token JWT do usuário.' })
  token: string;
}
