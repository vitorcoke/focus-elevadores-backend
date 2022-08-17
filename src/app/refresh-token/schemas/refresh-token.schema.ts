import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type RefreshTokenDocument = RefreshToken & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'update_at' } })
export class RefreshToken {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  update_at: Date;

  @ApiProperty()
  @Prop({ required: true })
  expires_in: number;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  user_id: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
