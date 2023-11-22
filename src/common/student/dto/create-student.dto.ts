import { Prisma } from '@prisma/client';
export class CreateStudentDto implements Prisma.StudentUncheckedCreateInput {
  createdAt: Date | string;
  credential: Prisma.CredentialUncheckedCreateNestedOneWithoutStudentInput;
  email: string;
  id: string;
  messages: Prisma.MessageUncheckedCreateNestedManyWithoutStudentInput;
  name: string;
  phone: string;
  tickets: Prisma.TicketUncheckedCreateNestedManyWithoutStudentInput;
}
