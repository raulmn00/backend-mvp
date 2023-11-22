import { Prisma } from '@prisma/client';
export class CreateAdminDto implements Prisma.AdminUncheckedCreateInput {
  createdAt: Date | string;
  credential: Prisma.CredentialUncheckedCreateNestedOneWithoutAdminInput;
  email: string;
  id: string;
  messages: Prisma.MessageUncheckedCreateNestedManyWithoutAdminInput;
  name: string;
  phone: string;
}
