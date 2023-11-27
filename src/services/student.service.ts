import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateStudentDto } from '../common/student/dto/create-student.dto';
import { UpdateStudentDto } from '../common/student/dto/update-student.dto';
import { PrismaService } from '../prisma.service';
import {Message} from "@prisma/client";

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateStudentDto) {

    const {name, email, phone, password} = data

    const exists = await this.prisma.student.findFirst({
      where: {
        email
      },
    });

    if (exists) {
      throw new NotAcceptableException('Aluno existente.');
    }
    const student = await this.prisma.student.create({
      data: {
        name,
        email,
        phone,
        credential: {
          create: {
            password
          }
        }
      },
      include: {
        messages: true,
      }
    });
    return student;
  }

  async findAll() {
    const allStudents = this.prisma.student.findMany({
      include: {
        messages: true,
      }
    });
    return allStudents;
  }

  async getStudentMessages(studentId: string): Promise<Message[]> {

    const studentMessages = await this.prisma.message.findMany({
      where: {
        createdBy: studentId
      },
      include: {
        student: true
      }
    })

    return studentMessages;
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
