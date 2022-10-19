import { PartialType } from '@nestjs/swagger';
import { CreateBannerSwagger } from './create-banner.swagger';

export class UpdateBannerSwagger extends PartialType(CreateBannerSwagger) {}
