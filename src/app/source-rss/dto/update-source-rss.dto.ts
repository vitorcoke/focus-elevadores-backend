import { PartialType } from '@nestjs/swagger';
import { CreateSourceRssDto } from './create-source-rss.dto';

export class UpdateSourceRssDto extends PartialType(CreateSourceRssDto) {}
