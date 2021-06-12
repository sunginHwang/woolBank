import { delay } from '@support/util/delay';

import { IAccountBookCategory } from '@models/accountBook/IAccountBookCategory';
import { AccountBookCategoryType } from '@models/accountBook/AccountBookCategoryType';
import { IAccountBookSaveForm } from '@models/accountBook/IAccountBookSaveForm';
import { IAccountBookListItem } from '@models/accountBook/IAccountBookListItem';
import apiCall from '@support/util/apiCall';
import { ApiResType } from '@models/api/ApiResType';

/*
 * 가계부 카테고리 작성 api
 * @Todo 더미 치환 해야 함
 * */
export const addAccountBookCategory = async ({
  name,
  type
}: {
  name: string;
  type: AccountBookCategoryType;
}): Promise<IAccountBookCategory> => {
  await delay(300);
  const res = await apiCall.post<ApiResType<IAccountBookCategory>>('account-book-categories', { type, name });
  return res.data.data;
};

export const fetchAccountBookCategories = async (): Promise<IAccountBookCategory[]> => {
  await delay(300);
  const apiResult = await apiCall.get<ApiResType<IAccountBookCategory[]>>('account-book-categories');
  return apiResult.data.data;
};

/*
 * 가계부 작성 api
 * */
export const addAccountBook = async (accountBook: IAccountBookSaveForm): Promise<IAccountBookListItem> => {
  const { title, registerDateTime, type, amount, memo, category } = accountBook;
  const requestParam = { title, registerDateTime, type, amount, memo, categoryId: category.id };
  await delay(300);
  const apiResult = await apiCall.post<ApiResType<IAccountBookListItem>>('account-books/', requestParam);
  return apiResult.data.data;
};

/*
 * 가계부 리스트 조회
 * @Todo 더미 치환 해야 함
 * */
export const fetchAccountBookList = async (searchDate: string) => {
  const date = new Date(searchDate);
  await delay(300);
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
