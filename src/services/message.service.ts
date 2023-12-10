import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from '../common/message/create-message.dto';
import { UpdateMessageDto } from '../common/message/update-message.dto';
import { PrismaService } from '../prisma.service';
import { Admin, Message, Prisma, Student } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMessageDto) {
    return this.prisma.message.create({
      data,
    });
  }

  async getTicketMessages(ticketId: string) {
    //concat interfaces
    type PrismaMessage = Message & {
      admin?: Admin;
      student?: Student;
    };
    const ticketMessages: PrismaMessage[] = await this.prisma.message.findMany({
      where: {
        ticketId,
      },
      include: {
        admin: true,
        student: true,
      },
      orderBy: { createdAt: Prisma.SortOrder.asc },
    });

    return ticketMessages.map((message) => {
      const createdBy =
        message.createdBy == message.adminId ? message.admin : message.student;
      const createdByAdmin = message.createdBy == message.adminId;
      return {
        ...message,
        createdBy,
        createdByAdmin,
      };
    });
  }

  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
