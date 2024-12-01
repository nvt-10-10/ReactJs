export function transformToInt(value: any): number | null {
  if (value === null || value === undefined || value === '') {
    return null; // Hoặc trả về giá trị mặc định, ví dụ: return 0;
  }
  return typeof value === 'string' ? parseInt(value, 10) : value;
}

export function transformToFloat(value: any): number | null {
  if (value === null || value === undefined || value === '') {
    return null; // Hoặc trả về giá trị mặc định, ví dụ: return 0;
  }
  return typeof value === 'string' ? parseFloat(value) : value;
}
