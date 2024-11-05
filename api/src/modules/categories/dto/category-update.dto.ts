import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class CategoryUpdateDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
