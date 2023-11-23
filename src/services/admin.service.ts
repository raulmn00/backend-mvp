import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateAdminDto } from '../common/admin/dto/create-admin.dto';
import { UpdateAdminDto } from '../common/admin/dto/update-admin.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Admin } from '@prisma/client';
import { hash } from 'bcrypt';
@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateAdminDto) {
    const password = data.credential.connect.password.toString();

    const exists = await this.prisma.admin.findFirst({
      where: {
        email: data.email,
      },
    });
    if (exists) {
      throw new NotAcceptableException('Admin existente.');
    }

    if (typeof password !== 'undefined') {
      data.credential = {
        create: { password: await hash(password, 1) },
      };
    }

    const admin = await this.prisma.admin.create({
      data,
    });

    return admin;
  }

  async findAll(): Promise<Admin[]> {
    return this.prisma.admin.findMany();
  }

  findOne(id: string): Promise<Admin> {
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
}
