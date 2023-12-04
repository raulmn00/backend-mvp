import { UserPayload } from '../models/UserPayload';
import { Admin, Student } from '@prisma/client';

export interface UserToken {
  access_token: string;
  user: Admin | Student;
}
