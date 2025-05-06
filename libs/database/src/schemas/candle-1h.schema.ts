import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'candle_1h', autoIndex: true })
export class Candle1h extends Document {
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

export const Candle1hSchema = SchemaFactory.createForClass(Candle1h);

Candle1hSchema.index({ s: 1, t: -1 });
