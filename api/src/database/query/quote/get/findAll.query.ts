import { Quote } from 'src/entities';
import { FindCommonOptions } from '../../interface';
import { StatusQuote } from 'src/type/quote.type';
import { Repository } from 'typeorm';
import { findCommon } from '../../common';
export const findAll = async (
  quoteRepository: Repository<Quote>,
  take: number = 10,
  page: number = 1,
  status: StatusQuote,
  isGetLength: boolean = false,
): Promise<any[] | [any[], number]> => {
  const options: FindCommonOptions = {
    take,
    page,
    isGetLength,
    filters: [
      {
        field: 'quote.status',
        operator: '=',
        value: status,
      },
    ],
    joins: [],
    where: {},
    orWhere: [],
    orderBy: { field: 'quote.createdAt', direction: 'ASC' },
    selects: [],
  };
  const QuoteSelect: string[] = [
    'id',
    'code',
    'name',
    'images',
    'quantity',
    'createdAt',
  ];
  options.selects = QuoteSelect.map((item) => ({
    alias: 'quote',
    field: item,
  }));

  return await findCommon(
    { entity: new Quote(), alias: 'quote' },
    quoteRepository,
    options,
  );
};
