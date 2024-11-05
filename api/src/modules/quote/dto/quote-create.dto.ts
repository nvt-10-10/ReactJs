import { Transform } from 'class-transformer';
import { IsString, IsNumber, IsArray } from 'class-validator';

export class QuoteCreateDto {
  @IsString()
  name: string;

  @IsString()
  description: string; // Now required

  @IsNumber()
  quantity: number; // Now required

  @IsString()
  unit: string; // Now required

  @Transform(({ value }) =>
    typeof value === 'string' ? parseFloat(value) : value,
  )
  price: number; // Now required

  @IsNumber()
  price_unit: number; // Now required

  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return [parseInt(value, 10)];
    }
    if (Array.isArray(value) && value.every((v) => typeof v === 'string')) {
      return value.map((v) => parseInt(v, 10));
    }
    return value;
  })
  category: number[]; // Now required

  @Transform(({ value }) =>
    typeof value === 'string' ? parseInt(value, 10) : value,
  )
  @IsNumber()
  user_id: number; // Now required
}
