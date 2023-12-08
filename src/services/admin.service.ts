import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAdminDto } from '../common/admin/dto/create-admin.dto';
import { UpdateAdminDto } from '../common/admin/dto/update-admin.dto';
import { PrismaService } from '../prisma.service';
import { Admin } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserPayload } from '../auth/common/UserPayload';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async create(data: CreateAdminDto) {
    const { name, email, phone, password } = data;

    const exists = await this.prisma.admin.findFirst({
      where: {
        email,
      },
    });
    if (exists) {
      throw new NotAcceptableException('Admin existente.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await this.prisma.admin.create({
      data: {
        name,
        email,
        phone,
        credential: {
          create: {
            password: hashedPassword,
          },
        },
      },
      include: {
        messages: true,
      },
    });

    return admin;
  }

  async findAll(): Promise<Admin[]> {
    return this.prisma.admin.findMany();
  }

  async findOne(id: string): Promise<Admin> {
    return this.prisma.admin.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: UpdateAdminDto): Promise<Admin> {
    return this.prisma.admin.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string): Promise<Admin> {
    return this.prisma.admin.delete({
      where: {
        id,
      },
    });
  }

  async getStudentMessages(id: string) {
    const adminMessages = await this.prisma.message.findMany({
      where: {
        createdBy: id,
      },
      include: {
        admin: true,
      },
    });

    return adminMessages;
  }

  async findByEmail(email: string) {
    const admin = await this.prisma.admin.findUnique({
      where: {
        email,
      },
      include: {
        credential: true,
      },
    });

    return admin;
  }

  async adminLogin(data: { email: string; password: string }) {
    const userIsStudent = await this.prisma.student.findUnique({
      where: {
        email: data.email,
      },
    });
    if (userIsStudent) {
      throw new NotAcceptableException(
        'Estudantes não podem acessar a área administrativa',
        { cause: new Error(), description: 'NotAcceptableException' },
      );
    }
    const validateAdmin = await this.validateAdmin(data.email, data.password);

    const { id, email, name } = validateAdmin;

    const payload: UserPayload = {
      email: email,
      name: name,
      sub: id,
    };

    const jwtToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    return {
      access_token: jwtToken,
      admin: validateAdmin,
    };
  }

  private async validateAdmin(email: string, passwordToCompare: string) {
    const isValidAdmin = await this.findByEmail(email);

    if (isValidAdmin) {
      const { password } = isValidAdmin.credential;

      const isPasswordValid = await bcrypt.compare(passwordToCompare, password);

      if (isPasswordValid) {
        return {
          ...isValidAdmin,
          credential: undefined,
        };
      }
    }
    throw new UnauthorizedException('Email ou senha invalidos.');
  }
}
