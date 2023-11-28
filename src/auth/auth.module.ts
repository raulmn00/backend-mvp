import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AdminModule } from '../modules/admin.module';
import { StudentModule } from '../modules/student.module';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, PrismaService],
  imports: [AdminModule, StudentModule],
})
export class AuthModule {}
