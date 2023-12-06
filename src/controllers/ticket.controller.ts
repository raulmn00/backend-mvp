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
  async update(@Param('id') id: string, @Body() data: UpdateTicketDto) {
    return this.ticketService.update(id, data);
  }

  @Patch('/changeStatus/:ticketId')
  async changeTicketStatus(@Param('ticketId') ticketId, @Body() data: any) {
    return await this.ticketService.changeTicketStatus(ticketId, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.ticketService.remove(id);
  }
}
