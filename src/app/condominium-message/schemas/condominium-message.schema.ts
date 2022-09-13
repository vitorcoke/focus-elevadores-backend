import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type CondominiumMessageDocument = CondominiumMessage & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'update_at' } })
export class CondominiumMessage {
  @ApiProperty()
  @Prop()
  _id: string;

  @ApiProperty()
  @Prop()
  created_at: Date;

  @ApiProperty()
  @Prop()
  update_at: Date;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  dayweek: string;

  @ApiProperty()
  @Prop()
  starttime: string;

  @ApiProperty()
  @Prop()
  endtime: string;

  @ApiProperty()
  @Prop()
  duration: string;

  @ApiProperty()
  @Prop()
  max_execution_time: string;

  @ApiProperty()
  @Prop()
  validity: string;

  @ApiProperty()
  @Prop()
  jpg_file: string;
}

export const CondominiumMessageSchema =
  SchemaFactory.createForClass(CondominiumMessage);
