import { registerAs } from '@nestjs/config';

export default registerAs('swagger', () => ({
  path: process.env.SWAGGER_PATH || 'swagger',
  prefix: process.env.SWAGGER_PREFIX,
}));
