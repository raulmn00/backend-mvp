import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AdminModule } from '../modules/admin.module';
import { StudentModule } from '../modules/student.module';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, PrismaService],
  imports: [
    AdminModule,
    StudentModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
  ],
})
export class AuthModule {}
