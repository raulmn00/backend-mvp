import { Admin, Student } from '@prisma/client';
import { Request } from 'express';

export interface AuthRequest extends Request {
  user: Admin | Student;
}
