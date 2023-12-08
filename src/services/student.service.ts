import {Injectable, NotAcceptableException, UnauthorizedException,} from '@nestjs/common';
import {CreateStudentDto} from '../common/student/dto/create-student.dto';
import {UpdateStudentDto} from '../common/student/dto/update-student.dto';
import {PrismaService} from '../prisma.service';
import {Message, Prisma} from '@prisma/client';
import * as bcrypt from 'bcrypt';
import {UserPayload} from '../auth/common/UserPayload';
import {JwtService} from '@nestjs/jwt';
import * as process from 'process';

@Injectable()
export class StudentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async create(data: CreateStudentDto) {
    const { name, email, phone, password } = data;

    const exists = await this.prisma.student.findFirst({
      where: {
        email,
      },
    });

    if (exists) {
      throw new NotAcceptableException('Aluno existente.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await this.prisma.student.create({
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
    return student;
  }

  async findAll() {
    return this.prisma.student.findMany({
      include: {
        messages: true,
      },
    });
  }

  async findStudentSearch(query: Prisma.StudentWhereInput) {
    return this.prisma.student.findMany({
      where: {
        OR: [
          { name: { contains: `${query.name}` } },
          { email: { contains: `${query.email}` } },
          { phone: { contains: `${query.phone}` } },
        ],
      },
      include: {
        messages: true,
      },
    });
  }

  async getStudentMessages(studentId: string): Promise<Message[]> {
    const studentMessages = await this.prisma.message.findMany({
      where: {
        createdBy: studentId,
      },
      include: {
        student: true,
      },
    });

    return studentMessages;
  }

  async findOne(id: string) {
    return this.prisma.student.findFirst({
      where: {
        id,
      },
    })
  }

  async findByEmail(email: string) {
    const student = await this.prisma.student.findUnique({
      where: {
        email,
      },
      include: {
        credential: true,
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

  async getStudentTickets(id: string) {
    return this.prisma.ticket.findMany({
      where: {
        studentId: id,
      },
    });
  }

  async studentLogin(data: { email: string; password: string }) {
    const userIsAdmin = await this.prisma.admin.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userIsAdmin) {
      throw new NotAcceptableException(
        'Administradores não podem acessar a área estudantil.',
        { cause: new Error(), description: 'NotAccetableException' },
      );
    }

    const validateStudent = await this.validateStudent(
      data.email,
      data.password,
    );

    const { id, email, name } = validateStudent;

    const payload: UserPayload = {
      email,
      name,
      sub: id,
    };
    const jwtToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    return {
      access_token: jwtToken,
      student: validateStudent,
    };
  }

  private async validateStudent(email: string, passwordToCompare: string) {
    const isValidStudent = await this.findByEmail(email);

    if (isValidStudent) {
      const { password } = isValidStudent.credential;

      const isPasswordValid = await bcrypt.compare(passwordToCompare, password);

      if (isPasswordValid) {
        return {
          ...isValidStudent,
          credential: undefined,
        };
      }
    }
    throw new UnauthorizedException('Email ou senha invalidos.');
  }
}
