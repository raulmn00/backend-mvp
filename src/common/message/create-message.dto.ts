import { Prisma } from '@prisma/client';

export class CreateMessageDto implements Prisma.MessageUncheckedCreateInput {
  adminId: string | null;
  content: string;
  createdAt: Date | string;
  id: string;
  studentId: string | null;
  ticketId: string | null;
}
