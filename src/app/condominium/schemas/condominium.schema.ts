import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type CondominiumDocument = Condominium & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'update_at' } })
export class Condominium {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  update_at: Date;

  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  condominium_id_imodulo: number;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  cnpj: number;

  @ApiProperty()
  @Prop()
  cep: string;

  @ApiProperty()
  @Prop()
  address: string;

  @ApiProperty()
  @Prop()
  district: string;

  @ApiProperty()
  @Prop()
  complement: string;

  @ApiProperty()
  @Prop()
  city: string;

  @ApiProperty()
  @Prop()
  state: string;

  @ApiProperty()
  @Prop()
  screens: string[];
}

export const CondominiumSchema = SchemaFactory.createForClass(Condominium);
