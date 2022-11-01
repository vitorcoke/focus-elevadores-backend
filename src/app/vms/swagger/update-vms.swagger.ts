import { PartialType } from '@nestjs/swagger';
import { CreateVmsSwagger } from './create-vms.swagger';

export class UpdateVmsSwagger extends PartialType(CreateVmsSwagger) {}
