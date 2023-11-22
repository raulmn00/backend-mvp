import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminModule } from './modules/admin.module';
import { StudentModule } from './modules/student.module';
import { ConfigModule } from '@nestjs/config';
import { TicketModule } from './modules/ticket.module';
import { TicketService } from './services/ticket.service';

// import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AdminModule,
    StudentModule,
    TicketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
