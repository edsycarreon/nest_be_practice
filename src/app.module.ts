import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from './jwt/jwt.module';
import { InventoryModule } from './inventory/inventory.module';

import databaseConfig from './config/databaseConfig';

@Module({
  imports: [
    AuthModule,
    DbModule,
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    JwtModule,
    InventoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
