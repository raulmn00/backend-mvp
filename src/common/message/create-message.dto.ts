import {
  Allow,
  IsDefined,
  IsEmpty,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateMessageDto {
  @Allow()
  adminId?: string;

  @IsNotEmpty()
  content: string;

  @IsString()
  studentId?: string | null;

  @IsString()
  ticketId: string | null;

  @IsString()
  @IsNotEmpty()
  createdBy: string;
}
