import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './app/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RefreshTokenModule } from './app/refresh-token/refresh-token.module';
import { CondominiumModule } from './app/condominium/condominium.module';
import { ScreensModule } from './app/screens/screens.module';
import { AdvertisingModule } from './app/advertising/advertising.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    ),
    AuthModule,
    UsersModule,
    RefreshTokenModule,
    CondominiumModule,
    ScreensModule,
    AdvertisingModule,
  ],
})
export class AppModule {}
