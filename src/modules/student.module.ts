import { Module } from '@nestjs/common';
import { StudentService } from '../services/student.service';
import { StudentController } from '../controllers/student.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [StudentController],
  providers: [StudentService, PrismaService],
  exports: [StudentService],
})
export class StudentModule {}
