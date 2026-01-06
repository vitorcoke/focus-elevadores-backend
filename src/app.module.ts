import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './app/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RefreshTokenModule } from './app/refresh-token/refresh-token.module';
import { CondominiumModule } from './app/condominium/condominium.module';
import { ScreensModule } from './app/screens/screens.module';
import { AdvertisingModule } from './app/advertising/advertising.module';
import { SourceRssModule } from './app/source-rss/source-rss.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { BannerModule } from './app/banner/banner.module';
import * as path from 'node:path';
import { CondominiumMessageModule } from './app/condominium-message/condominium-message.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulesModule } from './schedules/schedules.module';
import { ImoduloMessageModule } from './app/imodulo-message/imodulo-message.module';
import { VmsModule } from './app/vms/vms.module';
import { NoticiesModule } from './app/noticies/noticies.module';

console.log(
  'Database Connection String:',
  `${process.env.TYPE_CONNECTION}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hh1mcab.mongodb.net/?appName=Cluster0`,
);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: `${process.env.TYPE_CONNECTION}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hh1mcab.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '../rss'), // Corrigido para o caminho dentro do contêiner
      serveRoot: '/rss',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '../uploads'), // Corrigido para o caminho dentro do contêiner
      serveRoot: '/api/image',
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    RefreshTokenModule,
    CondominiumModule,
    ScreensModule,
    AdvertisingModule,
    SourceRssModule,
    BannerModule,
    CondominiumMessageModule,
    SchedulesModule,
    ImoduloMessageModule,
    VmsModule,
    NoticiesModule,
  ],
  providers: [],
})
export class AppModule {}
