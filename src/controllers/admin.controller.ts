import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { AdminService } from '../services/admin.service';
import { CreateAdminDto } from '../common/admin/dto/create-admin.dto';
import { UpdateAdminDto } from '../common/admin/dto/update-admin.dto';
import { Admin } from '@prisma/client';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create(@Body() data: any): Promise<Admin> {
    return await this.adminService.create(data);
  }

  @Get()
  async findAll(): Promise<Admin[]> {
    return this.adminService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Get('/message/:id')
  async getStudentMessages(@Param('id') id: string) {
    return await this.adminService.getStudentMessages(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateAdminDto) {
    return this.adminService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
