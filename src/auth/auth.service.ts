import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/app/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from 'src/app/refresh-token/refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  async validateUser(username: string, password: string) {
    try {
      const user = await this.usersService.findOne({ username }, '+password');

      if (!user) return null;

      const passwordIsCorrect = await bcrypt.compare(password, user.password);

      if (!passwordIsCorrect) return null;

      user.set('password', undefined);
      return user;
    } catch (err) {
      return null;
    }
  }

  async jwtLogin(user: any) {
    const refreshToken = await this.refreshTokenService.gerenateRefreshToken(
      user._id,
    );

    const payload = {
      username: user.username,
      permission: user.permission,
      sub: user._id,
    };
    return {
      user,
      token: this.jwtService.sign(payload),
      refresh_token: refreshToken,
    };
  }
}
