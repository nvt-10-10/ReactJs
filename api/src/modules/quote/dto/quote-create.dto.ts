import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, ValidateIf } from 'class-validator';
import { transformToArrayNumber } from 'src/transformers/array.transform';
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

  @IsNotEmpty() // T
  @Transform(({ value }) => transformToFloat(value))
  price: number;

  @IsNotEmpty() // T
  @Transform(({ value }) => transformToInt(value))
  price_unit: number;

  @IsNotEmpty()
  @Transform(transformToArrayNumber)
  category: number[];

  @IsNotEmpty()
  @Transform(({ value }) => transformToInt(value))
  user_id: number;

  @ValidateIf((obj, value) => value !== undefined)
  @IsFileNotEmpty()
  images: Express.Multer.File[]; // Dùng multer để xử lý mảng các file hình ảnh

  @ValidateIf((obj, value) => value !== undefined)
  @IsFileNotEmpty()
  document: Express.Multer.File[]; // Dùng multer để xử lý file tài liệu
}
