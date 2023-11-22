import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentService } from '../services/student.service';
import { CreateStudentDto } from '../common/student/dto/create-student.dto';
import { UpdateStudentDto } from '../common/student/dto/update-student.dto';
import { Student } from '@prisma/client';
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async create(@Body() data: CreateStudentDto): Promise<Student> {
    return this.studentService.create(data);
  }

  @Get()
  async findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Student> {
    return this.studentService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateStudentDto,
  ): Promise<Student> {
    return this.studentService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Student> {
    return this.studentService.remove(id);
  }
}
