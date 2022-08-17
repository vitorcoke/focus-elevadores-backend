import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/app/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './config/jwt.config';
import { LocalStrategy } from './strategies/local.strategy';
import { jwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenModule } from 'src/app/refresh-token/refresh-token.module';

@Module({
  imports: [
    UsersModule,
    RefreshTokenModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, jwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
