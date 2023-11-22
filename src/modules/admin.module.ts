import { Module } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { AdminController } from '../controllers/admin.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, PrismaService],
})
export class AdminModule {}
