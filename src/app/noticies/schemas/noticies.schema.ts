import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type NoticiesDocument = Noticies & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'update_at' } })
export class Noticies {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop()
  created_at: Date;

  @ApiProperty()
  @Prop()
  update_at: Date;

  @ApiProperty()
  @Prop()
  user_id: string;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  search: string;

  @ApiProperty()
  @Prop()
  state: string;

  @ApiProperty()
  @Prop()
  country: string;

  @ApiProperty()
  @Prop()
  city: string;

  @ApiProperty()
  @Prop()
  category: string;

  @ApiProperty()
  @Prop()
  language: string;

  @ApiProperty()
  @Prop({ default: [] })
  screen_id: string[];
}

export const NoticiesSchema = SchemaFactory.createForClass(Noticies);
