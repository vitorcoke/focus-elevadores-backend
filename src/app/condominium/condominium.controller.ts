import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HasPermissions } from 'src/auth/decorator/permission.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { BadRequestSwagger } from 'src/helpers/swagger/bad-request.swagger';
import { GenericExceptionSwagger } from 'src/helpers/swagger/generic-exception.swagger';
import { UserPermissions } from '../users/enums/user-permissions.enum';
import { CondominiumService } from './condominium.service';
import { CreateCondominiumDto } from './dto/create-condominium.dto';
import { UpdateCondominiumDto } from './dto/update-condominium.dto';
import { CreateCondominiumSwagger } from './swagger/create-condominium.swagger';
import { RetrieveCondominumSwagger } from './swagger/retrieve-condominium.swagger';
import { UpdateCondominiumSwagger } from './swagger/update-condominium.swagger';

@ApiTags('Condominios')
@Controller('condominium')
export class CondominiumController {
  constructor(private readonly condominiumService: CondominiumService) {}

  @ApiOperation({ summary: 'Criar uma condominio' })
  @ApiResponse({
    status: 201,
    description: 'Condiminio criado com sucesso',
    type: CreateCondominiumSwagger,
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
  @HasPermissions([UserPermissions.Admin, UserPermissions.Client])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post()
  async create(@Body() createCondominiumDto: CreateCondominiumDto) {
    return this.condominiumService.create(createCondominiumDto);
  }

  @ApiOperation({ summary: 'Buscar informações dos condominios cadastrados' })
  @ApiQuery({
    name: 'query',
    required: false,
    type: String,
    description:
      'Caso seja passado "all" na query, será listado todos os condominios caso o usuário tenha permissão de administrador',
    example: 'all',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso ao buscar condominios cadastrados.',
    isArray: true,
    type: RetrieveCondominumSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro ao buscar condominios cadastrados.',
    type: GenericExceptionSwagger,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query('query') query: string, @Request() request: any) {
    return this.condominiumService.findAll(query === 'all', request.user._id);
  }

  @ApiOperation({ summary: 'Atualizar informações de um condominio' })
  @ApiResponse({
    status: 201,
    description: 'informações atualizada com sucesso',
    type: UpdateCondominiumSwagger,
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
  @ApiParam({ name: 'id', description: 'ID do condominio que será atualizado' })
  @ApiBearerAuth()
  @HasPermissions([UserPermissions.Admin])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() upadteCondominiumDto: UpdateCondominiumDto,
  ) {
    return this.condominiumService.update(id, upadteCondominiumDto);
  }

  @ApiOperation({ summary: 'Deletar um condominio pelo ID' })
  @ApiResponse({
    status: 204,
    description: 'Condominio deletado com sucesso',
    type: UpdateCondominiumSwagger,
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
  @ApiParam({ name: 'id', description: 'ID do condominio' })
  @ApiBearerAuth()
  @HasPermissions([UserPermissions.Admin])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.condominiumService.remove(id);
  }
}
