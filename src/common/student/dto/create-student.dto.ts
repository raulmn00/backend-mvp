import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class CreateStudentDto  {

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
