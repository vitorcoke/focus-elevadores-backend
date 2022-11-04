import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ScreensDocument = Screens & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'update_at' } })
export class Screens {
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

  @ApiProperty()
  @Prop()
  validity: Date;

  @ApiProperty()
  @Prop()
  source_rss?: string[];

  @ApiProperty()
  @Prop()
  banner?: string;

  @ApiProperty()
  @Prop()
  advertising?: string[];

  @ApiProperty()
  @Prop()
  condominium_message?: string[];

  @ApiProperty()
  @Prop()
  condominium_id: string;

  @ApiProperty()
  @Prop()
  state: string;

  @ApiProperty()
  @Prop()
  city: string;

  @ApiProperty()
  @Prop()
  condominium_id_imodulo: number;

  @ApiProperty()
  @Prop()
  vms_camera: string[];
}

export const ScreensSchema = SchemaFactory.createForClass(Screens);
