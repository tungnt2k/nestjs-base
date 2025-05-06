import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventPattern } from '@nestjs/microservices';

export const KAFKA_TOPIC_METADATA = '__kafka-topic';

// https://github.com/nestjs/nest/issues/3912
export function KafkaTopic(config: string | keyof ConfigService) {
  return (target: any, key: string | symbol, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(KAFKA_TOPIC_METADATA, config, descriptor.value);
    return descriptor;
  };
}

@Injectable()
export class KafkaDecoratorProcessorService {
  constructor(private readonly configSvc: ConfigService) {}
  processKafkaDecorators(types: any[]) {
    for (const type of types) {
      const propNames = Object.getOwnPropertyNames(type.prototype);
      for (const prop of propNames) {
        const propValue = Reflect.getMetadata(KAFKA_TOPIC_METADATA, Reflect.get(type.prototype, prop));
        if (propValue) {
          const topic = this.configSvc.get(propValue);

          Reflect.decorate(
            [EventPattern(topic)],
            type.prototype,
            prop,
            Reflect.getOwnPropertyDescriptor(type.prototype, prop),
          );
        }
      }
    }
  }
}
