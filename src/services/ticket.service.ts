import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateTicketDto } from '../common/ticket/dto/create-ticket.dto';
import { UpdateTicketDto } from '../common/ticket/dto/update-ticket.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateTicketDto) {
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

  findAll() {
    return `This action returns all ticket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
