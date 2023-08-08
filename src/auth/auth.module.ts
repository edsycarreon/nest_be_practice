import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DbModule } from 'src/db/db.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { Jwt } from 'src/utils';

@Module({
  imports: [
    DbModule,
    JwtModule.register({
      global: true,
      secret: 'practice-secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
    Jwt,
  ],
})
export class AuthModule {}
