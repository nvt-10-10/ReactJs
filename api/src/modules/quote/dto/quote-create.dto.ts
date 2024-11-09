import { Transform } from 'class-transformer';
import { IsString, IsOptional } from 'class-validator';
import { transformToArrayNumber } from 'src/transformers/array.transform';
import {
  transformToFloat,
  transformToInt,
} from 'src/transformers/number.transform';

export class QuoteCreateDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @Transform(({ value }) => transformToInt(value))
  quantity: number;

  @IsString()
  unit: string;

  @Transform(({ value }) => transformToFloat(value))
  price: number;

  @Transform(({ value }) => transformToInt(value))
  price_unit: number;

  @IsOptional()
  @Transform(transformToArrayNumber)
  category: number[];

  @Transform(({ value }) => transformToInt(value))
  user_id: number;

  @IsOptional() // Thêm điều kiện tùy chọn nếu không gửi file
  images?: Express.Multer.File[]; // Dùng multer để xử lý mảng các file hình ảnh

  @IsOptional()
  document?: Express.Multer.File[]; // Dùng multer để xử lý file tài liệu
}
