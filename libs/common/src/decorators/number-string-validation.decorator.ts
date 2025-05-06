import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

import { NumberUtil } from '../utils/number.util';

export function NumberStringGte(property: string, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'numberStringGte',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return NumberUtil.gte(value, args.constraints[0]);
        },
      },
    });
  };
}

export function IsIntegerString(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'integerString',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          return NumberUtil.isInteger(value);
        },
      },
    });
  };
}
