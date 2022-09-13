import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type SourceRssDocument = SourceRss & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'update_at' } })
export class SourceRss {
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
  url: string;

  @ApiProperty()
  @Prop()
  logotipo: string;
}

export const SourceRssSchema = SchemaFactory.createForClass(SourceRss);
