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
import { NoticiesService } from './noticies.service';
import { HasPermissions } from 'src/auth/decorator/permission.decorator';
import { UserPermissions } from '../users/enums/user-permissions.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { CreateNoticiesDto } from './dto/create-noticies.dto';
import { BadRequestSwagger } from 'src/helpers/swagger/bad-request.swagger';
import { GenericExceptionSwagger } from 'src/helpers/swagger/generic-exception.swagger';
import { FindNoticiesSwagger } from './swagger/find-noticies.swagger';
import { UpdateNoticiesDto } from './dto/update-noticies.dto';

@ApiTags('Noticies')
@Controller('noticies')
export class NoticiesController {
  constructor(private readonly noticiesService: NoticiesService) {}

  @ApiOperation({ summary: 'Criar uma nova noticia' })
  @ApiResponse({
    status: 201,
    description: 'Noticia criada com sucesso',
    type: CreateNoticiesDto,
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
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post()
  async create(
    @Body() createNoticiesDto: CreateNoticiesDto,
    @Request() req: any,
  ) {
    return await this.noticiesService.create(createNoticiesDto, req.user._id);
  }

  @ApiOperation({ summary: 'Buscar todas as Noticias' })
  @ApiResponse({
    status: 200,
    description: 'Noticias encontrada com sucesso',
    type: FindNoticiesSwagger,
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
    return this.noticiesService.findAll(req.user._id);
  }

  @ApiOperation({ summary: 'Buscar a noticia' })
  @ApiResponse({
    status: 201,
    description: 'Noticia encontrada com sucesso',
    type: FindNoticiesSwagger,
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
    return this.noticiesService.findOne(id);
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
    return this.noticiesService.removeScreenId(id);
  }

  @ApiOperation({ summary: 'Alterar noticia por ID' })
  @ApiResponse({
    status: 201,
    description: 'Noticia Alterada com sucesso',
    type: CreateNoticiesDto,
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
    @Body() updateNoticiesDto: UpdateNoticiesDto,
  ) {
    return this.noticiesService.update(id, updateNoticiesDto);
  }

  @ApiOperation({ summary: 'Deletar noticia por ID' })
  @ApiResponse({
    status: 201,
    description: 'Noticia deletada com sucesso',
    type: CreateNoticiesDto,
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
    return this.noticiesService.remove(id);
  }

  @ApiOperation({ summary: 'Adicionar uma tela na noticia' })
  @ApiResponse({
    status: 201,
    description: 'Tela adicionada com sucesso',
    type: FindNoticiesSwagger,
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
    return this.noticiesService.updateScreenId(id, screenId.screen_id);
  }
}
