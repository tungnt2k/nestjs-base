import { DefaultPaging } from 'src/common/enum';

/**
 *
 * @param page
 * @param perPage
 * @param total
 *
 * @returns
 */
export const paginate = (
  total: number,
  page = DefaultPaging.PAGE,
  perPage = DefaultPaging.LIMIT,
): {
  page: number;
  perPage: number;
  totalPages: number;
  total: number;
  prev: number | undefined;
  next: number | undefined;
} => {
  const sumOfPages = Math.ceil(total / perPage);

  return {
    page,
    perPage,
    totalPages: sumOfPages,
    total,
    prev: page > 1 ? page - 1 : undefined,
    next: page < sumOfPages ? Number(page) + 1 : undefined,
  };
};
