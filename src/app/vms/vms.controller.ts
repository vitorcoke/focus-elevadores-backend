import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HasPermissions } from 'src/auth/decorator/permission.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BadRequestSwagger } from 'src/helpers/swagger/bad-request.swagger';
import { GenericExceptionSwagger } from 'src/helpers/swagger/generic-exception.swagger';
import { UserPermissions } from '../users/enums/user-permissions.enum';
import { CreateVmsDto } from './dto/create-vms.dto';
import { UpdateVmsDto } from './dto/update-vms.dto';
import { CreateVmsSwagger } from './swagger/create-vms.swagger';
import { UpdateVmsSwagger } from './swagger/update-vms.swagger';
import { VmsService } from './vms.service';

@ApiTags('Vms')
@Controller('vms')
export class VmsController {
  constructor(private readonly vmsService: VmsService) {}

  @ApiOperation({ summary: 'Criar nova vms' })
  @ApiResponse({
    status: 201,
    description: 'Vms criada com sucesso',
    type: CreateVmsSwagger,
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
  @ApiBearerAuth()
  @HasPermissions([UserPermissions.Admin])
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createVmsDto: CreateVmsDto) {
    return await this.vmsService.create(createVmsDto);
  }

  @ApiOperation({ summary: 'Buscar vms' })
  @ApiResponse({
    status: 200,
    description: 'Vms encontrada com sucesso',
    type: CreateVmsSwagger,
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
  @ApiBearerAuth()
  @HasPermissions([
    UserPermissions.Admin,
    UserPermissions.Sindico,
    UserPermissions.Zelador,
  ])
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.vmsService.findAll();
  }

  @ApiOperation({ summary: 'Buscar vms por condomínio' })
  @ApiResponse({
    status: 200,
    description: 'Vms encontrada com sucesso',
    type: CreateVmsSwagger,
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
  @ApiBearerAuth()
  @HasPermissions([
    UserPermissions.Admin,
    UserPermissions.Sindico,
    UserPermissions.Zelador,
  ])
  @UseGuards(JwtAuthGuard)
  @Get('condominium/:condominiumId')
  async findOne(@Param('condominiumId') id: string) {
    return await this.vmsService.findByCondominiumId(id);
  }

  @ApiOperation({ summary: 'Alterar vms' })
  @ApiResponse({
    status: 200,
    description: 'Vms alterada com sucesso',
    type: UpdateVmsSwagger,
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
  @ApiBearerAuth()
  @HasPermissions([UserPermissions.Admin])
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateVmsDto: UpdateVmsDto) {
    return await this.vmsService.update(id, updateVmsDto);
  }

  @ApiOperation({ summary: 'Deletar VMS por ID' })
  @ApiResponse({
    status: 202,
    description: 'VMS deletada com sucesso',
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
  @ApiBearerAuth()
  @HasPermissions([UserPermissions.Admin])
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.vmsService.remove(id);
  }
}
