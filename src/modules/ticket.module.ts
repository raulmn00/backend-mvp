import { Module } from '@nestjs/common';
import { TicketService } from '../services/ticket.service';
import { TicketController } from '../controllers/ticket.controller';
import { PrismaService } from '../../prisma/prisma.service';
@Module({
  controllers: [TicketController],
  providers: [TicketService, PrismaService],
})
export class TicketModule {}
