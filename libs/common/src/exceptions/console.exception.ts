import { ValidationError } from '@nestjs/common';

export class ConsoleException extends Error {
  constructor(errors: ValidationError[]) {
    super();

    console.log(errors);

    this.message = errors.toString();
    this.stack = errors.map((error) => error.toString()).join('\n');
  }
}
