import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateStudentDto } from '../common/student/dto/create-student.dto';
import { UpdateStudentDto } from '../common/student/dto/update-student.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateStudentDto) {
    const exists = await this.prisma.student.findFirst({
      where: {
        email: data.email,
      },
    });

    if (exists) {
      throw new NotAcceptableException('Aluno existente.');
    }
    const student = await this.prisma.student.create({
      data,
    });
    return student;
  }

  async findAll() {
    const allStudents = this.prisma.student.findMany();
    return allStudents;
  }

  async findOne(id: string) {
    const student = this.prisma.student.findFirst({
      where: {
        id,
      },
    });

    return student;
  }

  async update(id: string, data: UpdateStudentDto) {
    const exists = await this.prisma.student.findFirst({
      where: {
        id,
      },
    });
    if (!exists) {
      throw new NotAcceptableException('Aluno não existente.');
    }

    return this.prisma.student.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.student.delete({
      where: {
        id,
      },
    });
  }
}
