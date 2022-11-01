import { PartialType } from '@nestjs/swagger';
import { CreateVmsDto } from './create-vms.dto';

export class UpdateVmsDto extends PartialType(CreateVmsDto) {}
