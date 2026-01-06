import { PartialType } from '@nestjs/swagger';
import { CreateNoticiesDto } from './create-noticies.dto';

export class UpdateNoticiesDto extends PartialType(CreateNoticiesDto) {}
