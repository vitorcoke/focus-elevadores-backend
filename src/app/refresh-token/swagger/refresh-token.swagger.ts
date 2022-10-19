import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenResponseSwagger {
  @ApiProperty()
  token: string;
}
