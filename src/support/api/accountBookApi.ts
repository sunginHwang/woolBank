import { format } from 'date-fns';
import apiCall from '@support/util/apiCall';
import { ApiResType } from '@models/api/ApiResType';
import { IAccountBookStatisticFilter } from '@models/accountBook/statistic/IAccountBookStatisticFilter';
import { IAccountBookStatistic } from '@models/accountBook/statistic/IAccountBookStatistic';
import { IAccountBookCategory } from '@models/accountBook/IAccountBookCategory';
import { AccountBookCategoryType } from '@models/accountBook/AccountBookCategoryType';
import { IAccountBookSaveForm } from '@models/accountBook/IAccountBookSaveForm';
import { IAccountBookListItem } from '@models/accountBook/IAccountBookListItem';

/*
 * 가계부 카테고리 작성 api
 * */
export const addAccountBookCategory = async ({
  name,
  type
}: {
  name: string;
  type: AccountBookCategoryType;
}): Promise<IAccountBookCategory> => {
  const res = await apiCall.post<ApiResType<IAccountBookCategory>>('account-book-categories', { type, name });
  return res.data.data;
};

export const fetchAccountBookCategories = async (): Promise<IAccountBookCategory[]> => {
  const apiResult = await apiCall.get<ApiResType<IAccountBookCategory[]>>('account-book-categories');
  return apiResult.data.data;
};

/*
 * 가계부 작성 api
 * */
export const addAccountBook = async (accountBook: IAccountBookSaveForm): Promise<IAccountBookListItem> => {
  const { title, registerDateTime, type, amount, memo, category } = accountBook;
  const requestParam = { title, registerDateTime, type, amount, memo, categoryId: category.id };
  const apiResult = await apiCall.post<ApiResType<IAccountBookListItem>>('account-books/', requestParam);
  const newAccountBook = apiResult.data.data;
  newAccountBook.registerDateTime = new Date(newAccountBook.registerDateTime);
  return newAccountBook;
};

/*
 * 가계부 수정 api
 * */
export const updateAccountBook = async (accountBookForm: IAccountBookSaveForm): Promise<IAccountBookListItem> => {
  const { title, registerDateTime, type, amount, memo, category, id } = accountBookForm;
  const requestParam = { title, registerDateTime, type, amount, memo, categoryId: category.id };
  const apiResult = await apiCall.put<ApiResType<IAccountBookListItem>>(`account-books/${id}`, requestParam);
  const newAccountBook = apiResult.data.data;
  newAccountBook.registerDateTime = new Date(newAccountBook.registerDateTime);
  return newAccountBook;
};

/*
 * 가계부 리스트 조회
 * */
export const fetchAccountBookList = async (searchDate: string) => {
  const date = new Date(searchDate);
  const apiResult = await apiCall.get<ApiResType<IAccountBookListItem[]>>('account-books', {
    params: { dateTime: date }
  });
  return apiResult.data.data.map((item) => {
    return {
      ...item,
      registerDateTime: new Date(item.registerDateTime)
    };
  });
};

/*
 * 가계부 리스트 상세 조회
 * */
export const fetchAccountBook = async (accountBookId: number) => {
  const apiResult = await apiCall.get<ApiResType<IAccountBookListItem>>(`account-books/${accountBookId}`);
  const accountBook = apiResult.data.data;
  // format date
  accountBook.registerDateTime = new Date(accountBook.registerDateTime);
  accountBook.category.createdAt = new Date(accountBook.category.createdAt);
  accountBook.category.updatedAt = new Date(accountBook.category.updatedAt);

  return accountBook;
};

/*
 * 가계부 삭제
 * */
export const deleteAccountBook = async (accountBookId: number) => {
  const apiResult = await apiCall.delete<ApiResType<number>>(`account-books/${accountBookId}`);
  return apiResult.data.data;
};

/*
 * 가계부 통계
 * */
export const fetchAccountBookStatistics = async (filterRequest: IAccountBookStatisticFilter) => {
  const params = {
    ...filterRequest,
    startDate: format(filterRequest.startDate, 'yyyy-MM-dd HH:mm:ss'),
    endDate: format(filterRequest.endDate, 'yyyy-MM-dd HH:mm:ss')
  };

  const apiResult = await apiCall.get<ApiResType<IAccountBookStatistic[]>>('account-books/statistics', {
    params
  });

  const accountBookStatisticList = apiResult.data.data.map((item) => {
    const listConvertDate = item.list.map((i) => {
      return { ...i, registerDateTime: new Date(i.registerDateTime) };
    });
    return { ...item, list: listConvertDate };
  });
  return accountBookStatisticList;
};
