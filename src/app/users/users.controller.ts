import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Delete,
  Param,
  Patch,
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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPermissions } from './enums/user-permissions.enum';
import { CreateUserSwagger } from './swagger/create-user.swagger';
import { RetrieveUserSwagger } from './swagger/retrieve-user.swagger';
import { UpdateUserSwagger } from './swagger/update-user-swagger';
import { UsersService } from './users.service';

@ApiTags('Usuário')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({ summary: 'Cria um usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    type: CreateUserSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Erro ao criar usuário',
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
  async create(@Body() createUserDto: CreateUserDto, @Request() req: any) {
    return this.usersService.create(createUserDto, req.user._id);
  }

  @ApiOperation({ summary: 'Buscar todos os usuarios' })
  @ApiResponse({
    status: 201,
    description: 'Usuários encontrados com sucesso',
    type: RetrieveUserSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Erro ao buscar usuários',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno',
    type: GenericExceptionSwagger,
  })
  @ApiBearerAuth()
  @HasPermissions([UserPermissions.Admin, UserPermissions.Sindico])
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req: any) {
    return this.usersService.findAll(req.user._id);
  }

  @ApiOperation({ summary: 'Buscar um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado com sucesso',
    type: RetrieveUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao buscar usuário',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 500,

    description: 'Erro interno',
    type: GenericExceptionSwagger,
  })
  @ApiBearerAuth()
  @HasPermissions([UserPermissions.Admin, UserPermissions.Sindico])
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async findOne(@Request() req: any) {
    return await this.usersService.findOne({ _id: req.user._id });
  }

  @ApiOperation({ summary: 'Buscar um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado com sucesso',
    type: RetrieveUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao buscar usuário',
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
  @Get('all')
  async findAllWithoutRestriction() {
    return await this.usersService.findAllWithoutRestriction();
  }

  @ApiOperation({ summary: 'Alterar usuário por ID' })
  @ApiResponse({
    status: 200,
    description: 'Usuário alterado com sucesso',
    type: UpdateUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao alterar usuário',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 500,

    description: 'Erro interno',
    type: GenericExceptionSwagger,
  })
  @ApiBearerAuth()
  @HasPermissions([UserPermissions.Admin, UserPermissions.Sindico])
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado com sucesso',
    type: RetrieveUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao buscar usuário',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno',
    type: GenericExceptionSwagger,
  })
  @UseGuards(JwtAuthGuard)
  @Get('bytoken')
  async findOneById(@Request() req: any) {
    return await this.usersService.findOne({ _id: req.user._id });
  }

  @ApiOperation({ summary: 'Deletar condominio do usuario por ID' })
  @ApiResponse({
    status: 200,
    description: 'Condominio deletado com sucesso',
    type: RetrieveUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao deletar condominio',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno',
    type: GenericExceptionSwagger,
  })
  @ApiBearerAuth()
  @HasPermissions([UserPermissions.Admin, UserPermissions.Sindico])
  @UseGuards(JwtAuthGuard)
  @Delete('/condominium/:condominiumId')
  async findCondominio(@Param('condominiumId') condominiumId: string) {
    return await this.usersService.removeCondominium(condominiumId);
  }

  @ApiOperation({ summary: 'Deletar usuário por ID' })
  @ApiResponse({
    status: 202,
    description: 'Usuário deletado com sucesso',
    type: RetrieveUserSwagger,
  })
  @ApiResponse({
    status: 402,
    description: 'Erro ao deletar usuário',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno',
    type: GenericExceptionSwagger,
  })
  @ApiBearerAuth()
  @HasPermissions([UserPermissions.Admin, UserPermissions.Sindico])
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
