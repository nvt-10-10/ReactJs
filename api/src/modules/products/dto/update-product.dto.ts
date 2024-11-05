import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { StatusProduct } from 'src/type';

export class UpadeProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) =>
    typeof value === 'string' ? parseFloat(value) : value,
  )
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) =>
    typeof value === 'string' ? parseFloat(value) : value,
  )
  quantity: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsOptional()
  status?: StatusProduct;

  @IsOptional()
  categoryIds: string | string[];
}
