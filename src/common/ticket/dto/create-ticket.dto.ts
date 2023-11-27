import {IsEmpty, IsNotEmpty, IsString} from "class-validator";

export class CreateTicketDto  {

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  studentId: string;

  @IsNotEmpty()
  @IsString()
  subject: string;
}
