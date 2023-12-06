import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from '../common/message/create-message.dto';
import { UpdateMessageDto } from '../common/message/update-message.dto';
import { PrismaService } from '../prisma.service';
import { Message, Admin, Student } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMessageDto) {
    const message = await this.prisma.message.create({
      data,
    });

    return message;
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
      orderBy: { createdAt: 'asc' },
    });

    return ticketMessages.map((message) => {
      const createdBy =
        message.createdBy == message.adminId ? message.admin : message.student;
      return {
        ...message,
        createdBy,
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
