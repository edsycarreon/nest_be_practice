import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from '../constants/constants';
import { ConfigService } from '@nestjs/config';

const config = new ConfigService();

const dbProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: config.get('database.user'),
    host: config.get('database.host'),
    database: config.get('database.name'),
    password: config.get('database.password'),
    port: 3336,
  }),
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
