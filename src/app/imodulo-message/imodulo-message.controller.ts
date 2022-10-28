import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from 'src/helpers/swagger/bad-request.swagger';
import { GenericExceptionSwagger } from 'src/helpers/swagger/generic-exception.swagger';
import { AlertBioAccessImoduloMessageDto } from './dto/alert-bio-imodulo-message.dto';
import { CreateImoduloMessageDto } from './dto/create-imodulo-message.dto';
import { ImoduloMessageService } from './imodulo-message.service';
import { CreateImoduloMessageSwagger } from './swagger/create-imodulo-message.swagger';

@ApiTags('ImoduloMessage')
@Controller('imodulo-message')
export class ImoduloMessageController {
  constructor(private readonly imoduloMessageService: ImoduloMessageService) {}

  @ApiOperation({ summary: 'Criar nova mensagem' })
  @ApiResponse({
    status: 201,
    description: 'Mensagem criada com sucesso',
    type: CreateImoduloMessageSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Requisição mal formatada',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno',
    type: GenericExceptionSwagger,
  })
  @Post()
  async create(@Body() createImoduloMessageDto: CreateImoduloMessageDto) {
    return await this.imoduloMessageService.create(createImoduloMessageDto);
  }

  @ApiOperation({ summary: 'Aviso de acesso na biometria' })
  @ApiResponse({
    status: 200,
    description: 'Acesso na biometria',
  })
  @ApiResponse({
    status: 400,
    description: 'Requisição mal formatada',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno',
    type: GenericExceptionSwagger,
  })
  @Post('alert-bio-access')
  async AlertBioAccess(
    @Body() alertBioAccessImoduloMessageDto: AlertBioAccessImoduloMessageDto,
    @Query('alert') alert: string,
  ) {
    return console.log('Acesso na biometria');
  }

  @ApiOperation({ summary: 'Apagar mensagem' })
  @ApiResponse({
    status: 202,
    description: 'Mensagem apagada com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Requisição mal formatada',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno',
    type: GenericExceptionSwagger,
  })
  @Delete()
  async delete(@Body() { message_id, type }) {
    return console.log(message_id, type);
  }
}
