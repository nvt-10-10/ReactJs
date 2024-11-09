import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { Transform } from 'class-transformer';
import {
  transformToFloat,
  transformToInt,
} from 'src/transformers/number.transform';
import { transformToArrayNumber } from 'src/transformers/array.transform';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => transformToFloat(value))
  price: number;

  @IsNotEmpty()
  @Transform(({ value }) => transformToInt(value))
  quantity: number;

  @IsOptional()
  @IsString()
  image?: string;

  @Transform(({ value }) => transformToArrayNumber(value))
  categoryIds: number[];
}
