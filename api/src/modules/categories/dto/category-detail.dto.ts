import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class CategoryDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
