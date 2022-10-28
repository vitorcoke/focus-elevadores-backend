import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ImoduloMessageDocument = ImoduloMessage & Document;

@Schema()
export class ImoduloMessage {
  @ApiProperty()
  @Prop()
  condominiun_id: number;

  @ApiProperty()
  @Prop()
  unity: string;

  @ApiProperty()
  @Prop()
  block: string;

  @ApiProperty()
  @Prop()
  type: string;

  @ApiProperty()
  @Prop()
  message: string;

  @ApiProperty()
  @Prop()
  message_id: string;

  @ApiProperty()
  @Prop()
  date: Date;
}

export const ImoduloMessageSchema =
  SchemaFactory.createForClass(ImoduloMessage);
