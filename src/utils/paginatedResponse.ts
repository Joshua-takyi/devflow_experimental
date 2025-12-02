type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};

export const paginatedResponse = <T>(
  data: T[],
  page: number,
  limit: number
): PaginatedResponse<T> => {
  const total = data.length;
  const start = (page - 1) * limit;
  const end = page * limit;
  return {
    data: data.slice(start, end),
    total,
    page,
    limit,
  };
};
