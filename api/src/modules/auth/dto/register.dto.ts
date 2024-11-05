import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsOptional()
  @IsString() // Kiểm tra nếu có giá trị thì phải là chuỗi
  name?: string; // Dấu ? để thuộc tính này có thể là undefined
}
