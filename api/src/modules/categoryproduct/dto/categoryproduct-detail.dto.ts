
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class CategoryProductDto {
  @IsOptional()
  id?: number;

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
