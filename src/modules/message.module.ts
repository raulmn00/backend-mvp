import { Module } from '@nestjs/common';
import { MessageService } from '../services/message.service';
import { MessageController } from '../controllers/message.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [MessageController],
  providers: [MessageService, PrismaService],
})
export class MessageModule {}
