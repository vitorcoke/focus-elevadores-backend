import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginResponseSwagger } from './swagger/login.swagger';
import { Request as ExpressRequest } from 'express';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Efetua a autenticação na api' })
  @ApiResponse({
    status: 200,
    description: 'Usuário autenticado com sucesso',
    type: LoginResponseSwagger,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() _: LoginDto, @Request() req: ExpressRequest) {
    return this.authService.jwtLogin(req.user);
  }
}
