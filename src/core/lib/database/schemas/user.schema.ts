/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';

@Schema({ timestamps: true, collection: 'users', autoIndex: true })
export class User extends Document {
  @Prop({ index: true, unique: true })
  email: string;

  @Prop({ index: true })
  parentEmail: string;

  @Prop()
  refCode: string;

  @Prop()
  parentRefCode: string;

  @Prop({ default: false })
  leader: boolean;

  @Prop()
  child: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
