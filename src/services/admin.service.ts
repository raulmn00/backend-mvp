import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateAdminDto } from '../common/admin/dto/create-admin.dto';
import { UpdateAdminDto } from '../common/admin/dto/update-admin.dto';
import { PrismaService } from '../prisma.service';
import { Admin } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateAdminDto) {
    const { name, email, phone, password } = data;

    const exists = await this.prisma.admin.findFirst({
      where: {
        email
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
    const admin = await this.prisma.admin.findFirst({
      where: {
        email,
      },
    });

    return admin;
  }
}
