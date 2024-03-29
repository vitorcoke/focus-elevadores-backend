import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
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
import { CondominiumMessageService } from './condominium-message.service';
import { CreateCondominiumMessegeDto } from './dto/create-condominium-messege.dto';
import { UpdateCondominiumMessegeDto } from './dto/update-condominium-messege.dto';
import { CreateCondominiumMessegeSwagger } from './swagger/create-condominium-messege.swagger';
import { RetrieveCondominumMessegeSwagger } from './swagger/retrieve-condominium-messege.swagger';
import { UpdateCondominiumMessegeSwagger } from './swagger/update-condominium-messege.swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { uuid } from 'uuidv4';

@ApiTags('CondominiumMessage')
@Controller('condominium-message')
export class CondominiumMessageController {
  constructor(
    private readonly condominiumMessageService: CondominiumMessageService,
  ) {}

  @ApiOperation({ summary: 'Criar uma mensagem de condominio' })
  @ApiResponse({
    status: 201,
    description: 'Mensagem de condominio criada com sucesso',
    type: CreateCondominiumMessegeSwagger,
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
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @HasPermissions([
    UserPermissions.Admin,
    UserPermissions.Sindico,
    UserPermissions.Zelador,
  ])
  @Post()
  async create(
    @Body() createCondominiumMessegeDto: CreateCondominiumMessegeDto,
    @Request() req: any,
  ) {
    return this.condominiumMessageService.create(
      createCondominiumMessegeDto,
      req.user._id,
    );
  }

  @ApiOperation({ summary: 'Salvar imagem da mensagem' })
  @ApiResponse({
    status: 201,
    description: 'Imgagem salva com sucesso',
    type: CreateCondominiumMessegeSwagger,
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
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @HasPermissions([
    UserPermissions.Admin,
    UserPermissions.Sindico,
    UserPermissions.Zelador,
  ])
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename: string =
            path.parse(file.originalname).name.replace(/\s/g, '') +
            uuid().substring(0, 5);
          const extension: string = path.parse(file.originalname).ext;

          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  @Post('/upload')
  async uploadImg(@UploadedFile() file: Express.Multer.File) {
    return file.filename;
  }

  @ApiOperation({ summary: 'Buscar todas as mensagens de condominio' })
  @ApiResponse({
    status: 200,
    description: 'Mensagens de condominio encontrada com sucesso',
    type: RetrieveCondominumMessegeSwagger,
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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @HasPermissions([
    UserPermissions.Admin,
    UserPermissions.Sindico,
    UserPermissions.Zelador,
  ])
  @Get()
  async findAll(@Request() req: any) {
    return this.condominiumMessageService.findAll(req.user._id);
  }

  @ApiOperation({ summary: 'Buscar uma mensagem de condominio' })
  @ApiResponse({
    status: 200,
    description: 'Mensagem de condominio encontrada com sucesso',
    type: RetrieveCondominumMessegeSwagger,
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
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @HasPermissions([
    UserPermissions.Admin,
    UserPermissions.Sindico,
    UserPermissions.Zelador,
  ])
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.condominiumMessageService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar uma mensagem de condominio' })
  @ApiResponse({
    status: 201,
    description: 'Mensagem de condominio atualizada com sucesso',
    type: UpdateCondominiumMessegeSwagger,
  })
  @ApiResponse({
    status: 401,
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
  @HasPermissions([UserPermissions.Admin, UserPermissions.Sindico])
  @Patch(':id')
  async update(
    @Body() updateCondominiumMessegeDto: UpdateCondominiumMessegeDto,
    @Param('id') id: string,
  ) {
    return this.condominiumMessageService.update(
      id,
      updateCondominiumMessegeDto,
    );
  }

  @ApiOperation({ summary: 'Adicionar uma tela na mensagem de condominio' })
  @ApiResponse({
    status: 201,
    description: 'Tela atualizada com sucesso',
    type: UpdateCondominiumMessegeSwagger,
  })
  @ApiResponse({
    status: 401,
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
  @HasPermissions([UserPermissions.Admin, UserPermissions.Sindico])
  @Patch(':id/screen')
  async updateScreenId(
    @Body() screenId: { screen_id: string },
    @Param('id') id: string,
  ) {
    return this.condominiumMessageService.updateScreenId(
      id,
      screenId.screen_id,
    );
  }

  @ApiOperation({ summary: 'Deletar mesagem de condominio por ID' })
  @ApiResponse({
    status: 202,
    description: 'Mensagem de condominio deletada com sucesso',
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
  @HasPermissions([UserPermissions.Admin, UserPermissions.Sindico])
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.condominiumMessageService.remove(id);
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
    return this.condominiumMessageService.removeScreenId(id);
  }
}
