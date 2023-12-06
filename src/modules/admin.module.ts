import { Module } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { AdminController } from '../controllers/admin.controller';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AdminController],
  providers: [AdminService, PrismaService, JwtService],
  exports: [AdminService],
})
export class AdminModule {}
