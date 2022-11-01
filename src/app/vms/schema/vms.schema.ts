import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type VmsDocument = Vms & Document;

@Schema()
export class Vms {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  server: string;

  @ApiProperty()
  @Prop()
  port: number;

  @ApiProperty()
  @Prop()
  username: string;

  @ApiProperty()
  @Prop()
  password: string;

  @ApiProperty()
  @Prop()
  receiver: number;

  @ApiProperty()
  @Prop()
  account: number;

  @ApiProperty()
  @Prop()
  condominium_id: string;
}

export const VmsSchema = SchemaFactory.createForClass(Vms);
