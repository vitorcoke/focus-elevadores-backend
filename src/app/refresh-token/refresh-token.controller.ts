import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenericExceptionSwagger } from 'src/helpers/swagger/generic-exception.swagger';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshTokenService } from './refresh-token.service';
import { RefreshTokenResponseSwagger } from './swagger/refresh-token.swagger';

@ApiTags('Refresh Token')
@Controller('refresh-token')
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @ApiOperation({
    summary: 'Cria um novo token de autentiação para o usuário.',
  })
  @ApiResponse({
    status: 201,
    description: 'Token de autenticação criado com sucesso.',
    type: RefreshTokenResponseSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Refresh token expirado.',
    type: GenericExceptionSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Refresh token inválido.',
    type: GenericExceptionSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Refresh token mal formatado.',
    type: GenericExceptionSwagger,
  })
  @Post()
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.refreshTokenService.regenerateJWT(refreshTokenDto);
  }
}
