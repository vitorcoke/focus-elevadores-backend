import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ScreensDocument = Screens & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'update_at' } })
export class Screens {
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
  @Prop({ required: true, unique: true })
  token: string;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  validity: Date;

  @ApiProperty()
  @Prop()
  orientation: string;

  @ApiProperty()
  @Prop()
  source_rss?: string[];

  @ApiProperty()
  @Prop()
  advertising?: string[];

  @ApiProperty()
  @Prop()
  condominium_message: string[];
}

export const ScreensSchema = SchemaFactory.createForClass(Screens);
