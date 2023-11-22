import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateAdminDto } from '../common/admin/dto/create-admin.dto';
import { UpdateAdminDto } from '../common/admin/dto/update-admin.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Admin } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateAdminDto): Promise<Admin> {
    const exists = await this.prisma.admin.findFirst({
      where: {
        email: data.email,
      },
    });
    if (exists) {
      throw new NotAcceptableException('Admin existente.');
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

  async update(id: string, data: UpdateAdminDto) {
    return this.prisma.admin.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.admin.delete({
      where: {
        id,
      },
    });
  }
}
