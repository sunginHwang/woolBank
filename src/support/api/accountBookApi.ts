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
  type,
  userId
}: {
  name: string;
  type: AccountBookCategoryType;
  userId: number;
}): Promise<IAccountBookCategory> => {
  await delay(300);
  const now = new Date();

  return {
    id: now.getTime(),
    name,
    type,
    createdAt: now,
    updatedAt: now
  };
};

/*
 * 가계부 작성 api
 * @Todo 더미 치환 해야 함
 * */
export const addAccountBook = async ({
  accountBook,
  userId
}: {
  accountBook: IAccountBookSaveForm;
  userId: number;
}): Promise<{}> => {
  await delay(300);
  console.log(accountBook);
  return {};
};

/*
 * 가계부 리스트 조회
 * @Todo 더미 치환 해야 함
 * */
export const fetchAccountBookList = async (searchDate: Date) => {
  console.log(searchDate);
  await delay(1000);
  const apiResult = await apiCall.get<ApiResType<IAccountBookListItem[]>>('account-books', {
    params: searchDate
  });
  return apiResult.data.data.map((item) => {
    return {
      ...item,
      registerDateTime: new Date(item.registerDateTime)
    };
  });
};
