import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateTicketDto } from '../common/ticket/dto/create-ticket.dto';
import { UpdateTicketDto } from '../common/ticket/dto/update-ticket.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Ticket } from '@prisma/client';

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateTicketDto): Promise<Ticket> {
    const exist = await this.prisma.ticket.findFirst({
      where: {
        id: data.id,
      },
    });
    if (exist) {
      throw new NotAcceptableException('Ticket existente.');
    }

    const studentExist = await this.prisma.student.findFirst({
      where: {
        id: data.studentId,
      },
    });

    if (!studentExist) {
      throw new NotAcceptableException(
        'O aluno não existe, não foi possível criar seu ticket.',
      );
    }

    const ticket = await this.prisma.ticket.create({
      data,
    });
    return ticket;
  }

  async findAll(): Promise<Ticket[]> {
    return this.prisma.ticket.findMany();
  }

  async findOne(id: string): Promise<Ticket> {
    return this.prisma.ticket.findFirstOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: string, data: UpdateTicketDto): Promise<Ticket> {
    return this.prisma.ticket.update({
      where: {
        id,
      },
      data,
    });
  }

  remove(id: string): Promise<Ticket> {
    return this.prisma.ticket.delete({
      where: {
        id,
      },
    });
  }
}
