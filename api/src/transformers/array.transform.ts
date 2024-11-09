import { TransformFnParams } from 'class-transformer';

/**
 * Hàm chuyển đổi chuỗi thành mảng số
 * @param value Giá trị cần chuyển đổi
 * @returns Mảng số đã chuyển đổi
 */
export function transformToArrayNumber({ value }: TransformFnParams): number[] {
  if (value === undefined || value === null) {
    return []; // Trả về mảng rỗng nếu value không tồn tại
  }
  if (typeof value === 'string') {
    return value
      .split(',')
      .map(Number)
      .filter((n) => !isNaN(n));
  } else if (Array.isArray(value)) {
    return value.map((item) => Number(item)).filter((n) => !isNaN(n));
  }
  return [];
}
