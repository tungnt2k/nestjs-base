import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'candle_10s', autoIndex: true })
export class Candle10s extends Document {
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

export const Candle10sSchema = SchemaFactory.createForClass(Candle10s);

Candle10sSchema.index({ s: 1, t: -1 });
