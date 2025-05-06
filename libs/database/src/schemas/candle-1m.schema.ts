import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'candle_1m', autoIndex: true })
export class Candle1m extends Document {
  @Prop({ index: true })
  s: string;

  @Prop()
  o: number;

  @Prop()
  h: number;

  @Prop()
  l: number;

  @Prop()
  c: number;

  @Prop()
  v: number;

  @Prop({ index: true })
  t: number;
}

export const Candle1mSchema = SchemaFactory.createForClass(Candle1m);

Candle1mSchema.index({ s: 1, t: -1 });
