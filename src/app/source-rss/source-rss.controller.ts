import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
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
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { BadRequestSwagger } from 'src/helpers/swagger/bad-request.swagger';
import { GenericExceptionSwagger } from 'src/helpers/swagger/generic-exception.swagger';
import { UserPermissions } from '../users/enums/user-permissions.enum';
import { CreateSourceRssDto } from './dto/create-source-rss.dto';
import { UpdateSourceRssDto } from './dto/update-source-rss.dto';
import { SourceRssService } from './source-rss.service';
import { CreateSourceRssSwagger } from './swagger/create-source-rss.swagger';

@ApiTags('SourceRss')
@Controller('source-rss')
export class SourceRssController {
  constructor(private readonly sourceRssService: SourceRssService) {}

  @ApiOperation({ summary: 'Criar uma nova fonte RSS' })
  @ApiResponse({
    status: 201,
    description: 'Fonte RSS criada com sucesso',
    type: CreateSourceRssSwagger,
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
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post()
  async create(
    @Body() createSourceRssDto: CreateSourceRssDto,
    @Request() req: any,
  ) {
    return this.sourceRssService.create(createSourceRssDto, req.user._id);
  }

  @ApiOperation({ summary: 'Buscar todas as fonte RSS' })
  @ApiResponse({
    status: 201,
    description: 'Fontes RSS encontrada com sucesso',
    type: CreateSourceRssSwagger,
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
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get()
  async findAll(@Request() req: any) {
    return this.sourceRssService.findAll(req.user._id);
  }

  @ApiOperation({ summary: 'Buscar fonte RSS por ID' })
  @ApiResponse({
    status: 201,
    description: 'Fontes RSS encontrada com sucesso',
    type: CreateSourceRssSwagger,
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
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.sourceRssService.findOne(id);
  }

  @ApiOperation({ summary: 'Alterar fonte RSS por ID' })
  @ApiResponse({
    status: 201,
    description: 'Fontes RSS Alterada com sucesso',
    type: CreateSourceRssSwagger,
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
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSourceRssDto: UpdateSourceRssDto,
  ) {
    return this.sourceRssService.update(id, updateSourceRssDto);
  }

  @ApiOperation({ summary: 'Adicionar uma tela no rss' })
  @ApiResponse({
    status: 201,
    description: 'Tela adicionada com sucesso',
    type: CreateSourceRssSwagger,
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
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Patch(':id/screen')
  async updateScreenId(
    @Param('id') id: string,
    @Body() screenId: { screen_id: string },
  ) {
    return this.sourceRssService.updateScreenId(id, screenId.screen_id);
  }

  @ApiOperation({ summary: 'Deletar fonte RSS por ID' })
  @ApiResponse({
    status: 201,
    description: 'Fontes RSS deletada com sucesso',
    type: CreateSourceRssSwagger,
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
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.sourceRssService.remove(id);
  }

  @ApiOperation({ summary: 'Deletar tela cadastrada por ID' })
  @ApiResponse({
    status: 202,
    description: 'Tela deletada com sucesso',
  })
  @ApiResponse({
    status: 402,
    description: 'Requisição mal formatada',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno',

    type: GenericExceptionSwagger,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @HasPermissions([
    UserPermissions.Admin,
    UserPermissions.Sindico,
    UserPermissions.Zelador,
  ])
  @Delete('/screen/:id')
  async removeScreenId(@Param('id') id: string) {
    return this.sourceRssService.removeScreenId(id);
  }
}
