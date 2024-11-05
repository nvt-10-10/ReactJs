import { Response } from 'express';
import * as XLSX from 'xlsx';

/**
 * @functionName downloadCsv
 * @param data
 * @param res
 * @param filename
 * @param config for title of header and skipHeader
 * @returns
 */
export const downloadCsv = async (
  res: Response,
  data: any[],
  filename: string,
) => {
  const newData = JSON.parse(JSON.stringify(data));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(newData), 'Data');
  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'csv' });
  res.statusCode = 200;
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${filename}.xlsx"`,
  );
  return res.end(buf);
};
