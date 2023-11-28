import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { StudentService } from '../services/student.service';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly studentService: StudentService,
    private readonly prisma: PrismaService,
  ) {}
  async login() {
    return Promise.resolve(undefined);
  }

  async validateUser(email: string, passwordToCompare: string) {
      const admin = await this.adminService.findByEmail(email);
      const student = await this.studentService.findByEmail(email);

      if (admin) {
        //check password
        const { password } = admin.credential;

        const isPasswordValid = await bcrypt.compare(
          passwordToCompare,
          password,
        );

        if (isPasswordValid) {
          return {
            ...admin,
            credential: undefined,
          };
        }
      }

      if (student) {
        //check password
        const { password } = student.credential;

        const isPasswordValid = await bcrypt.compare(
          passwordToCompare,
          password,
        );

        if (isPasswordValid) {
          return {
            ...student,
            credential: undefined,
          };
        }
      }

      throw new UnauthorizedException('Email ou senha invalidos.')
  }
}
