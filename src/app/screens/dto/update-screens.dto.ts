import { PartialType } from '@nestjs/swagger';
import { CreateScreensDto } from './create-screens.dto';

export class UpdateScreensDto extends PartialType(CreateScreensDto) {}
