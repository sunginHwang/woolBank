import { delay } from '@support/util/delay';

import { IAccountBookCategory } from '@models/accountBook/IAccountBookCategory';
import { AccountBookCategoryType } from '@models/accountBook/AccountBookCategoryType';
import { IAccountBookSaveForm } from '@models/accountBook/IAccountBookSaveForm';
import { IAccountBookListItem } from '@models/accountBook/IAccountBookListItem';

/*
* 가계부 카테고리 작성 api
* @Todo 더미 치환 해야 함
* */
export const addAccountBookCategory = async ({ name, type, userId }: { name: string, type: AccountBookCategoryType, userId: number}): Promise<IAccountBookCategory> => {
  await delay(300);
  const now = new Date();

  return {
    id: now.getTime(),
    name,
    type,
    createdAt: now,
    updatedAt: now,
  } ;
}

/*
* 가계부 작성 api
* @Todo 더미 치환 해야 함
* */
export const addAccountBook = async ({ accountBook, userId }: { accountBook: IAccountBookSaveForm, userId: number}): Promise<{}> => {
  await delay(300);
  console.log(accountBook);
  return {} ;
}

/*
* 가계부 리스트 조회
* @Todo 더미 치환 해야 함
* */
export const fetchAccountBookList = async (searchDate: Date): Promise<IAccountBookListItem[]> => {
  console.log(searchDate);
  await delay(1000);
  return DUMMY.list;
}

const DUMMY: {
  list: IAccountBookListItem[];
} = {
  list: [
    {
      id: 111,
      title: '오늘날짜 테스트 구매',
      isRegularExpenditure: true,
      categoryName: '취미생활',
      amount: 50000,
      type: 'income',
      registerDateTime: new Date()
    },
    {
      id: 1,
      title: '피규어 구매',
      isRegularExpenditure: false,
      categoryName: '취미생활',
      amount: 50000,
      type: 'expenditure',
      registerDateTime: new Date(2021, 5, 3,11,30)
    },
    {
      id: 2,
      title: '교통비',
      isRegularExpenditure: false,
      categoryName: '차비',
      amount: 3020,
      type: 'expenditure',
      registerDateTime: new Date(2021, 5, 3, 12, 40)
    },
  ]
}
