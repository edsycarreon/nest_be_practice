import { Module } from '@nestjs/common';
import { databaseProviders } from './db.providers';
import { DbService } from './db.service';

@Module({
  providers: [...databaseProviders, DbService],
  exports: [...databaseProviders],
})
export class DbModule {}
