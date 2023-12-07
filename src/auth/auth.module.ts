import { Module } from '@nestjs/common';
import { AdminModule } from '../modules/admin.module';
import { StudentModule } from '../modules/student.module';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [PrismaService, JwtStrategy],
  imports: [
    AdminModule,
    StudentModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthModule {}
