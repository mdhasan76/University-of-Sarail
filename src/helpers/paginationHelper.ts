import { SortOrder } from 'mongoose';

type IOption = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

type IReturn = {
  skip: number;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: SortOrder;
};

const calculatePagination = (option: IOption): IReturn => {
  const page = Number(option.page) || 1;
  const limit = Number(option.limit) || 10;

  const skip = (page - 1) * limit;

  const sortBy = option.sortBy || 'createdAt';
  const sortOrder = option.sortOrder || 'desc';

  return {
    skip,
    page,
    limit,
    sortBy,
    sortOrder,
  };
};

export const paginationHelper = { calculatePagination };
