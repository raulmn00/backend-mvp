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
import { UpdateAdminDto } from '../common/admin/dto/update-admin.dto';
import { Admin } from '@prisma/client';
import { IsPublic } from '../auth/decorators/is-public.decorator';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @IsPublic()
  @Post()
  async create(@Body() data: any): Promise<Admin> {
    return await this.adminService.create(data);
  }

  @IsPublic()
  @Post('/login')
  async adminLogin(@Body() data: { email: string; password: string }) {
    return await this.adminService.adminLogin(data);
  }

  @Get()
  async findAll(): Promise<Admin[]> {
    return this.adminService.findAll();
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    return this.adminService.findByEmail(email);
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
