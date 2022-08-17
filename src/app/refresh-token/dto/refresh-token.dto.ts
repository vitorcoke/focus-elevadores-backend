import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ description: 'ID do refresh token' })
  @IsNotEmpty()
  refreshTokenId: string;
}
