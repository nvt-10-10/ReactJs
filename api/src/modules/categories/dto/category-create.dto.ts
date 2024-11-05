import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CategoryCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  image?: string;

  // @IsNotEmpty()
  // @IsBoolean()
  // status: boolean;
}
