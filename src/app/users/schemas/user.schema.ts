import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'update_at' } })
export class User {
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
  username: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty()
  @Prop({ required: true, select: false })
  password: string;

  @ApiProperty()
  @Prop({ default: [] })
  condominium_id: string[];

  @ApiProperty()
  @Prop({ required: true })
  permission: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
