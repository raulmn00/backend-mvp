import { $Enums, Prisma } from '@prisma/client';
export class CreateTicketDto implements Prisma.TicketUncheckedCreateInput {
  createdAt: Date | string;
  description: string;
  id: string;
  messages: Prisma.MessageUncheckedCreateNestedManyWithoutTicketInput;
  status: $Enums.TicketStatus;
  studentId: string;
  subject: string;
}
