import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type CondominiumMessageDocument = CondominiumMessage & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'update_at' } })
export class CondominiumMessage {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop()
  user_id: string;

  @ApiProperty()
  @Prop()
  created_at: Date;

  @ApiProperty()
  @Prop()
  update_at: Date;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiPropertyOptional()
  @Prop()
  title: string;

  @ApiPropertyOptional()
  @Prop()
  message: string;

  @ApiPropertyOptional()
  @Prop()
  dayweek: string;

  @ApiPropertyOptional()
  @Prop()
  starttime: Date;

  @ApiPropertyOptional()
  @Prop()
  endtime: Date;

  @ApiPropertyOptional()
  @Prop()
  jpg_file: string;
}

export const CondominiumMessageSchema =
  SchemaFactory.createForClass(CondominiumMessage);
