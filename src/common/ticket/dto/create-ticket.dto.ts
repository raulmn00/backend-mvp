import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty({ message: 'O campo descrição não pode ser vazio.' })
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  studentId: string;

  @IsNotEmpty({ message: 'O campo assunto não pode ser vazio.' })
  @IsString()
  subject: string;

  @IsNotEmpty({ message: 'O campo tipo não pode ser vazio.' })
  @IsString()
  type: string;
}
