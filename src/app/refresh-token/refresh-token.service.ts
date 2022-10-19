import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import {
  RefreshToken,
  RefreshTokenDocument,
} from './schemas/refresh-token.schema';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshTokenDocument>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async gerenateRefreshToken(userId: string) {
    const expiresIn = dayjs().add(1, 'week').unix();

    const refreshTokenExist = await this.refreshTokenModel.findOne({
      user_id: userId,
    });

    if (refreshTokenExist) {
      return await this.refreshTokenModel.findOneAndUpdate(
        { user_id: userId },
        { $set: { expires_in: expiresIn } },
        { new: true },
      );
    }

    try {
      return await this.refreshTokenModel.create({
        user_id: userId,
        expires_in: expiresIn,
      });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async regenerateJWT(refreshTokenDto: RefreshTokenDto) {
    try {
      const refreshToken = await this.refreshTokenModel.findOne({
        _id: refreshTokenDto.refreshTokenId,
      });
      if (!refreshToken)
        throw new BadRequestException('Refresh token invalido');

      const refreshTokenExpired = dayjs().isAfter(
        dayjs.unix(refreshToken.expires_in),
      );

      if (refreshTokenExpired)
        throw new UnauthorizedException('Refresh token expirado');

      const refreshTokenOwner = await this.usersService.findOne({
        _id: refreshToken.user_id,
      });

      const token = this.jwtService.sign({
        username: refreshTokenOwner.username,
        permission: refreshTokenOwner.permission,
        sub: refreshTokenOwner._id,
      });

      return { token };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
