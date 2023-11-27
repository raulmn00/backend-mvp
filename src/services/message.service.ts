import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from '../common/message/create-message.dto';
import { UpdateMessageDto } from '../common/message/update-message.dto';
import {PrismaService} from "../prisma.service";

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMessageDto) {

    const message = await this.prisma.message.create({
      data
    });

    return message;

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
