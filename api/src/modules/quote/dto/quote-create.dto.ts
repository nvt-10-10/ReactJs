import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  ValidateIf,
  IsOptional,
  IsNumber,
  Validate,
} from 'class-validator';
import { transformToArrayNumber } from 'src/transformers/array.transform';
import { CheckPriceUnit } from 'src/transformers/checkPriceUnit.transform';
import { IsFileNotEmpty } from 'src/transformers/IsFileNotEmpty.transform';
import {
  transformToFloat,
  transformToInt,
} from 'src/transformers/number.transform';

export class QuoteCreateDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNotEmpty() // T
  @Transform(({ value }) => transformToInt(value))
  quantity: number;

  @IsString()
  unit: string;

  @IsOptional()
  @Transform(({ value }) => transformToFloat(value))
  price: number;

  @IsOptional()
  @Transform(({ value }) => transformToInt(value))
  @IsNumber({}, { message: 'Price unit must be a valid integer' })
  price_unit: number;

  @IsNotEmpty()
  @Transform(transformToArrayNumber)
  category: number[];

  @IsOptional()
  @Transform(({ value }) => transformToInt(value))
  @IsNumber({}, { message: 'Price must be a valid number' })
  user_id: number;

  @ValidateIf((obj, value) => value !== undefined)
  @IsFileNotEmpty()
  images: Express.Multer.File[]; // Dùng multer để xử lý mảng các file hình ảnh

  @ValidateIf((obj, value) => value !== undefined)
  @IsFileNotEmpty()
  document: Express.Multer.File[]; // Dùng multer để xử lý file tài liệu

  @ValidateIf((o) => o.price !== undefined || o.price_unit !== undefined)
  @Validate(CheckPriceUnit)
  checkPriceAndUnit: any;
}
