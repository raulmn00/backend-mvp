import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateAdminDto } from '../common/admin/dto/create-admin.dto';
import { UpdateAdminDto } from '../common/admin/dto/update-admin.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Admin } from '@prisma/client';
import { hash } from 'argon2';
@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateAdminDto) {
    console.log(data.credential.connect);
    const password = data.credential.connect.password.toString();

    console.log('hashedPassword: ', hash(password));

    const exists = await this.prisma.admin.findFirst({
      where: {
        email: data.email,
      },
    });
    if (exists) {
      throw new NotAcceptableException('Admin existente.');
    }

    if (password) {
      const hashedPassword = await hash(password);

      data.credential = {
        create: { password: hashedPassword },
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
