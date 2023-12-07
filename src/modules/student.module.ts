import { Module } from '@nestjs/common';
import { StudentService } from '../services/student.service';
import { StudentController } from '../controllers/student.controller';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [StudentController],
  providers: [StudentService, PrismaService, JwtService],
  exports: [StudentService],
})
export class StudentModule {}
