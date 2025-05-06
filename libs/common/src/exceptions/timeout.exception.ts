import { HttpStatusCode } from 'axios';

export class TimeoutError extends Error {
  protected code: string;

  constructor(message = 'INTERNAL_SERVER_ERROR') {
    super(message);
    this.name = 'Timeout';
    this.code = HttpStatusCode.BadRequest.toString();
  }

  getCode() {
    return this.code;
  }
}
