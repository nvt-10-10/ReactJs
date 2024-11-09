import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import {
  transformToFloat,
  transformToInt,
} from 'src/transformers/number.transform';
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
  @Transform(({ value }) => transformToFloat(value))
  price: number;

  @IsNotEmpty()
  @Transform(({ value }) => transformToInt(value))
  quantity: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsOptional()
  status?: StatusProduct;

  @IsNotEmpty()
  @Transform(({ value }) => transformToFloat(value))
  categoryIds: number[];
}
