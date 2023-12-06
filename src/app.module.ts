import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin.module';
import { StudentModule } from './modules/student.module';
import { ConfigModule } from '@nestjs/config';
import { TicketModule } from './modules/ticket.module';

import { MessageModule } from './modules/message.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-guard.auth';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AdminModule,
    StudentModule,
    TicketModule,
    MessageModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
