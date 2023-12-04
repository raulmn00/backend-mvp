export type ListMessageDto = MessageDto[];

export interface MessageDto {
  id: string;
  createdAt: string;
  studentId: string;
  adminId: string;
  content: string;
  ticketId: string;
  createdBy: CreatedBy;
  admin: Admin;
  student: Student;
}

type CreatedBy = Admin | Student;

interface Admin {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
}

interface Student {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
}
