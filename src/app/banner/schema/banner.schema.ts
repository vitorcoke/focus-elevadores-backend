import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type BannerDocument = Banner & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'update_at' } })
export class Banner {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  update_at: Date;

  @ApiProperty()
  @Prop()
  user_id: string;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  image: string;

  @ApiProperty()
  @Prop()
  description: string;

  @ApiProperty()
  @Prop()
  background_color: string;

  @ApiProperty()
  @Prop()
  font_color: string;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
