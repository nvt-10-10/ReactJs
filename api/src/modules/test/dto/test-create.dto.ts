
import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class TestCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  codeName?: string;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
