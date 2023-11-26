export class CreateStudentDto  {
  email: string;
  id: string;
  messages: Prisma.MessageUncheckedCreateNestedManyWithoutStudentInput;
  name: string;
  phone: string;
  tickets: Prisma.TicketUncheckedCreateNestedManyWithoutStudentInput;
}
