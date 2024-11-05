
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class CategoryProductUpdateDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  codeName?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
