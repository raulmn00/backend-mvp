import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateTicketDto } from '../common/ticket/dto/create-ticket.dto';
import { UpdateTicketDto } from '../common/ticket/dto/update-ticket.dto';
import { PrismaService } from '../prisma.service';
import { Prisma, Ticket, TicketStatus } from '@prisma/client';

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateTicketDto): Promise<Ticket> {
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
      include: {
        messages: true,
      },
    });
    return ticket;
  }

  async findAll(): Promise<Ticket[]> {
    return this.prisma.ticket.findMany({
      include: {
        messages: true,
      },
    });
  }

  async findTicketSearch(query: Prisma.TicketWhereInput) {
    let status = undefined;
    if (query.status === 'open') {
      status = TicketStatus.open;
    }
    if (query.status === 'pending') {
      status = TicketStatus.pending;
    }
    if (query.status === 'closed') {
      status = TicketStatus.closed;
    }

    try {
      return this.prisma.ticket.findMany({
        where: {
          OR: [
            { subject: { contains: `${query.subject}` } },
            { status: { equals: status as unknown as TicketStatus } },
            { description: { contains: `${query.description}` } },
            { type: { contains: `${query.type}` } },
          ],
        },
        include: {
          messages: true,
        },
      });
    } catch (err) {
      throw new Error('Invalid search. Please try again.');
    }
  }

  async findOne(id: string): Promise<Ticket> {
    return this.prisma.ticket.findFirstOrThrow({
      where: {
        id,
      },
    });
  }

  async getTicketMessages(ticketId: string) {
    const ticketMessages = await this.prisma.message.findMany({
      where: {
        ticketId,
      },
      include: {
        ticket: true,
      },
    });
    return ticketMessages;
  }

  async changeTicketStatus(ticketId: string, data: Prisma.TicketUpdateInput) {
    const updatedTicket = await this.prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data,
    });

    return updatedTicket;
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
