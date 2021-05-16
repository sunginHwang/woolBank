import { IAccountBookCategory } from '@models/accountBook/IAccountBookCategory';
import { AccountBookCategoryType } from '@models/accountBook/AccountBookCategoryType';
import { delay } from '@support/util/delay';
import { IAccountBookSaveForm } from '@models/accountBook/IAccountBookSaveForm';

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
