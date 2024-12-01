import { Transform } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsEmail,
} from 'class-validator';
import { transformToArrayNumber } from 'src/transformers/array.transform';

import { transformToInt } from 'src/transformers/number.transform';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsOptional()
  authToken?: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @Transform((value) => transformToInt(value))
  roleId?: number;

  @IsNumber()
  @IsOptional()
  country?: number;

  @IsOptional()
  @Transform(transformToArrayNumber)
  categories?: number[];
}
