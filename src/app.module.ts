import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin.module';
import { StudentModule } from './modules/student.module';
import { ConfigModule } from '@nestjs/config';
import { TicketModule } from './modules/ticket.module';

import { MessageModule } from './modules/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AdminModule,
    StudentModule,
    TicketModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
