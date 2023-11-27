import {IsNotEmpty, IsString} from "class-validator";

export class CreateMessageDto {

  @IsString()
  adminId: string | null;

  @IsNotEmpty()
  content: string;

  @IsString()
  studentId: string | null;

  @IsString()
  ticketId: string | null;
}
