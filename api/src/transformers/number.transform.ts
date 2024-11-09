export function transformToInt(value: any): number {
  return typeof value === 'string' ? parseInt(value, 10) : value;
}
export function transformToFloat(value: any): number {
  return typeof value === 'string' ? parseFloat(value) : value;
}
