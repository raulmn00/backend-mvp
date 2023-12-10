import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TicketService } from '../services/ticket.service';
import { CreateTicketDto } from '../common/ticket/dto/create-ticket.dto';
import { UpdateTicketDto } from '../common/ticket/dto/update-ticket.dto';
import { Prisma } from '@prisma/client';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  async create(@Body() data: CreateTicketDto) {
    return await this.ticketService.create(data);
  }

  @Get()
  async findAll() {
    return this.ticketService.findAll();
  }

  @Get('/search')
  async getTicketSearch(@Query() query) {
    return this.ticketService.findTicketSearch(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ticketService.findOne(id);
  }

  @Get('/message/:id')
  async getTicketMessages(@Param('id') id: string) {
    return await this.ticketService.getTicketMessages(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.TicketUpdateInput,
  ) {
    return this.ticketService.update(id, data);
  }

  @Delete(':ticketId')
  async remove(@Param('ticketId') ticketId: string) {
    return this.ticketService.remove(ticketId);
  }
}
