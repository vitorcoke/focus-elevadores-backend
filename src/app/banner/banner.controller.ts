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
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { CreateBannerSwagger } from './swagger/create-banner.swagger';
import { UpdateBannerSwagger } from './swagger/update-banner.swagger';

@ApiTags('Banner')
@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @ApiOperation({ summary: 'Cria um banner' })
  @ApiResponse({
    status: 201,
    description: 'Banner criado com sucesso',
    type: CreateBannerSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Erro ao criar banner',
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
  async create(@Body() createBannerDto: CreateBannerDto, @Request() req: any) {
    return this.bannerService.create(createBannerDto, req.user._id);
  }

  @ApiOperation({ summary: 'Buscar todos os banner' })
  @ApiResponse({
    status: 200,
    description: 'Banner encontrado com sucesso',
    type: CreateBannerSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao buscar banner',
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
    return this.bannerService.findAll(req.user._id);
  }

  @ApiOperation({ summary: 'Alterar banner por ID' })
  @ApiResponse({
    status: 200,
    description: 'Banner alterado com sucesso',
    type: UpdateBannerSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao alterar banner',
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
    @Body() updateBannerDto: UpdateBannerDto,
  ) {
    return this.bannerService.update(id, updateBannerDto);
  }

  @ApiOperation({ summary: 'Remover banner por ID' })
  @ApiResponse({
    status: 202,
    description: 'Banner removido com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao remover banner',
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
    return this.bannerService.remove(id);
  }
}
