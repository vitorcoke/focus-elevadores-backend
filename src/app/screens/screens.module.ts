import { Module } from '@nestjs/common';
import { ScreensService } from './screens.service';
import { ScreensController } from './screens.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Screens, ScreensSchema } from './schemas/screens.schema';
import { CondominiumModule } from '../condominium/condominium.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Screens.name, schema: ScreensSchema }]),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
    }),
    CondominiumModule,
    UsersModule,
  ],
  providers: [ScreensService],
  controllers: [ScreensController],
})
export class ScreensModule {}
