/* eslint-disable prettier/prettier */
import { PG_CONNECTION } from './../constants/constants';
import { createConnection } from 'mysql2/promise';

export const databaseProviders = [
  {
    provide: PG_CONNECTION,
    useFactory: async () => {
      return await createConnection({
        host: process.env.DATABASE_HOST,
        port: 3306,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
      });
    },
  },
];
