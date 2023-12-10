import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsEmail({}, { message: 'Formato incorreto de email.' })
  @IsNotEmpty({ message: 'O campo Email não pode ser vazio.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo Nome não pode ser vazio' })
  name: string;

  @IsString()
  phone: string;

  @IsNotEmpty({ message: 'O campo Senha não pode ser vazio.' })
  @IsString()
  password: string;
}
