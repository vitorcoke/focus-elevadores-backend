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
import { CreateScreensDto } from './dto/create-screens.dto';
import { UpdateScreensDto } from './dto/update-screens.dto';
import { ScreensService } from './screens.service';
import { CreateScreensSwagger } from './swagger/create-screens.swagger';

@ApiTags('Screens')
@Controller('screens')
export class ScreensController {
  constructor(private readonly screensService: ScreensService) {}

  @ApiOperation({ summary: 'Criar uma tela' })
  @ApiResponse({
    status: 201,
    description: 'Condiminio criado com sucesso',
    type: CreateScreensSwagger,
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
  @HasPermissions([UserPermissions.Admin, UserPermissions.Sindico])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post()
  async create(@Body() createScreenDto: CreateScreensDto, @Request() req: any) {
    return this.screensService.create(createScreenDto, req.user._id);
  }

  @ApiOperation({ summary: 'Buscar todas as tela' })
  @ApiResponse({
    status: 201,
    description: 'Telas encontradas com sucesso',
    type: CreateScreensSwagger,
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
    return this.screensService.findAll(req.user._id);
  }

  @ApiOperation({ summary: 'Buscar todas as tela do condoiminio informado' })
  @ApiResponse({
    status: 201,
    description: 'Telas encontradas com sucesso',
    type: CreateScreensSwagger,
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
  @Get('/condominiun_id/:id')
  async findCondominiumScreen(
    @Param('id') condominiumId: string,
    @Request() req: any,
  ) {
    return this.screensService.findCondominiumScreens(
      condominiumId,
      req.user._id,
    );
  }

  @ApiOperation({
    summary: 'Buscar todas as tela da messagem de condominio informado',
  })
  @ApiResponse({
    status: 200,
    description: 'Telas encontradas com sucesso',
    type: CreateScreensSwagger,
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
  @Get('/condominiumMessage/:id')
  async findCondominiumMessagesScreens(
    @Param('id') condominiumId: string,
    @Request() req: any,
  ) {
    return this.screensService.findCondominiumMessagesScreens(
      condominiumId,
      req.user._id,
    );
  }

  @ApiOperation({
    summary: 'Buscar todas as tela do RSS informado',
  })
  @ApiResponse({
    status: 200,
    description: 'Telas encontradas com sucesso',
    type: CreateScreensSwagger,
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
  @Get('/sourcerss/:id')
  async findSourceRssScreen(@Param('id') rssId: string, @Request() req: any) {
    return this.screensService.findSourceRssScreen(rssId, req.user._id);
  }

  @ApiOperation({
    summary: 'Buscar todas as tela da noticia informado',
  })
  @ApiResponse({
    status: 200,
    description: 'Telas encontradas com sucesso',
    type: CreateScreensSwagger,
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
  @Get('/noticies/:id')
  async findNoticiesScreen(
    @Param('id') noticieId: string,
    @Request() req: any,
  ) {
    return this.screensService.findNoticiesScreen(noticieId, req.user._id);
  }

  @ApiOperation({ summary: 'Buscar a tela' })
  @ApiResponse({
    status: 201,
    description: 'Tela encontrada com sucesso',
    type: CreateScreensSwagger,
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
    return this.screensService.findOne(id);
  }

  @ApiOperation({ summary: 'Alterar tela por ID' })
  @ApiResponse({
    status: 201,
    description: 'Telas alterada com sucesso',
    type: CreateScreensSwagger,
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
  @HasPermissions([UserPermissions.Admin, UserPermissions.Sindico])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateScreenDto: UpdateScreensDto,
  ) {
    return this.screensService.update(id, updateScreenDto);
  }

  @ApiOperation({ summary: 'Adicionar mensagem por ID da tela' })
  @ApiResponse({
    status: 201,
    description: 'Telas atualizada com sucesso',
    type: CreateScreensSwagger,
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
  @HasPermissions([UserPermissions.Admin, UserPermissions.Sindico])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Patch('/message/:id')
  async updateAddCondominiumMessage(
    @Param('id') id: string,
    @Body() updateScreenDto: any,
  ) {
    return this.screensService.updateAddCondominiumMessage(id, updateScreenDto);
  }

  @ApiOperation({ summary: 'Adicionar RSS por ID da tela' })
  @ApiResponse({
    status: 201,
    description: 'Telas atualizada com sucesso',
    type: CreateScreensSwagger,
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
  @HasPermissions([UserPermissions.Admin, UserPermissions.Sindico])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Patch('/rss/:id')
  async updateAddSourceRss(
    @Param('id') id: string,
    @Body() updateScreenDto: any,
  ) {
    return this.screensService.updateAddSourceRss(id, updateScreenDto);
  }

  @ApiOperation({ summary: 'Adicionar Noticia por ID da tela' })
  @ApiResponse({
    status: 201,
    description: 'Telas atualizada com sucesso',
    type: CreateScreensSwagger,
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
  @HasPermissions([UserPermissions.Admin, UserPermissions.Sindico])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Patch('/noticies/:id')
  async updateAddNoticies(
    @Param('id') id: string,
    @Body() updateScreenDto: any,
  ) {
    return this.screensService.updateAddNoticies(id, updateScreenDto);
  }

  @ApiOperation({ summary: 'Deletar todas as telas do condominio informado' })
  @ApiResponse({
    status: 201,
    description: 'Telas deletadas com sucesso',
    type: CreateScreensSwagger,
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
  @HasPermissions([UserPermissions.Admin, UserPermissions.Sindico])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete('/condominium_id/:id')
  async deleteCondominiumScreen(@Param('id') condominiumId: string) {
    return this.screensService.removeCondominiumScreens(condominiumId);
  }

  @ApiOperation({ summary: 'Deletar tela por ID' })
  @ApiResponse({
    status: 201,
    description: 'Tela deletada com sucesso',
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
  @HasPermissions([UserPermissions.Admin, UserPermissions.Sindico])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.screensService.remove(id);
  }

  @ApiOperation({ summary: 'Deletar fonte RSS da tela' })
  @ApiResponse({
    status: 202,
    description: 'Fonte RSS deletada com sucesso',
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
  @HasPermissions([UserPermissions.Admin, UserPermissions.Sindico])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete('/rss/:id')
  async deleteRss(@Param('id') id: string) {
    return this.screensService.removeRssFromScreen(id);
  }

  @ApiOperation({ summary: 'Deletar Noticia da tela' })
  @ApiResponse({
    status: 202,
    description: 'Noticia deletada com sucesso',
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
  @HasPermissions([UserPermissions.Admin, UserPermissions.Sindico])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete('/noticies/:id')
  async deleteNoticies(@Param('id') id: string) {
    return this.screensService.removeNoticiesFromScreen(id);
  }

  @ApiOperation({ summary: 'Deletar banner da tela' })
  @ApiResponse({
    status: 202,
    description: 'Banner deletado com sucesso',
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
  @HasPermissions([UserPermissions.Admin, UserPermissions.Sindico])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete('/banner/:id')
  async deleteBanner(@Param('id') id: string) {
    return this.screensService.removeBannerFromScreen(id);
  }

  @ApiOperation({ summary: 'Deletar mensagem das telas' })
  @ApiResponse({
    status: 202,
    description: 'Mensagem deletado com sucesso',
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
  @HasPermissions([UserPermissions.Admin, UserPermissions.Sindico])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete('/message/:id')
  async removeMessagesFromScreen(@Param('id') id: string) {
    return this.screensService.removeMessagesFromScreen(id);
  }

  @ApiOperation({ summary: 'Deletar mensagem da tela informada' })
  @ApiResponse({
    status: 202,
    description: 'Mensagem deletado com sucesso',
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
  @HasPermissions([UserPermissions.Admin, UserPermissions.Sindico])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete('/message/:messageId/screen/:screenId')
  async removeMessagesFromScreenById(
    @Param('messageId') messageId: string,
    @Param('screenId') screenId: string,
  ) {
    return this.screensService.removeMessagesFromScreenById(
      messageId,
      screenId,
    );
  }

  @ApiOperation({ summary: 'Deletar RSS da tela informada' })
  @ApiResponse({
    status: 202,
    description: 'RSS deletado com sucesso',
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
  @HasPermissions([UserPermissions.Admin, UserPermissions.Sindico])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete('/rss/:rssId/screen/:screenId')
  async removeRssFromScreenById(
    @Param('rssId') rssId: string,
    @Param('screenId') screenId: string,
  ) {
    return this.screensService.removeRssFromScreenById(rssId, screenId);
  }

  @ApiOperation({ summary: 'Deletar Noticia da tela informada' })
  @ApiResponse({
    status: 202,
    description: 'Noticia deletada com sucesso',
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
  @HasPermissions([UserPermissions.Admin, UserPermissions.Sindico])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete('/noticies/:noticiesId/screen/:screenId')
  async removeNoticiesFromScreenById(
    @Param('noticiesId') noticiesId: string,
    @Param('screenId') screenId: string,
  ) {
    return this.screensService.removeNoticiesFromScreenById(
      noticiesId,
      screenId,
    );
  }
}
