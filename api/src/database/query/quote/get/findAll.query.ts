import { Quote } from 'src/entities';
import { FindCommonOptions } from '../../interface';
import { Repository } from 'typeorm';
import { findCommon } from '../../common';
import { StatusQuote } from 'src/type/quote.type';
export const findAll = async (
  quoteRepository: Repository<Quote>,
  take: number = 10,
  page: number = 1,
  category?: number,
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
        value: StatusQuote.ACTIVE,
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

  if (category) {
    options.joins.push({
      table: 'categories',
      alias: 'category',
      type: 'left',
      condition:
        'category.id = category_quote.categoryId AND category_quote.quoteId = quote.id',
    });
    // options.filters.push({
    //   field: 'category_quote.categoryId',
    //   operator: '=',
    //   value: category,
    // });

    // options.filters.push({
    //   field: 'category.status',
    //   operator: '=',
    //   value: true,
    // });
  }

  return await findCommon(
    { entity: new Quote(), alias: 'quote' },
    quoteRepository,
    options,
  );
};
