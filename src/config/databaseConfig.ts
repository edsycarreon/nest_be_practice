import { registerAs } from '@nestjs/config';

export default registerAs('databaseConfig', () => ({
  port: parseInt(process.env.PORT, 10) || 3336,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  name: process.env.DATABASE_NAME,
}));
