import React from 'react';
import { useParams } from 'react-router';

import PageTemplate from '@components/layout/PageTemplate';
import { useQuery } from 'react-query';
import { fetchAccountBook } from '@support/api/accountBookApi';
import SpinnerLoading from '@components/common/SpinnerLoading';
import { IAccountBookListItem } from '@models/accountBook/IAccountBookListItem';
import { IAccountBookSaveForm } from '@models/accountBook/IAccountBookSaveForm';
import SaveForm from '@components/accountBook/save/SaveForm';

const initData: IAccountBookListItem = {
  id: -1,
  title: '',
  type: 'expenditure',
  isRegularExpenditure: false,
  amount: 0,
  category: {
    id: -1,
    name: '',
    type: 'expenditure',
    updatedAt: new Date(),
    createdAt: new Date()
  },
  registerDateTime: new Date()
};
/**
 * 가계부 상세 페이지
 * @component
 */

function AccountBookDetailPage() {
  const { accountBookId } = useParams();
  const { data = initData, isFetching } = useQuery<IAccountBookListItem>(['accountBook', Number(accountBookId)], () =>
    fetchAccountBook(Number(accountBookId))
  );

  const formData = convertFormData(data);

  const a = (a: any) => {
    console.log(a);
  };

  return (
    <PageTemplate title={data.title}>
      {isFetching && <SpinnerLoading loading />}
      <SaveForm isInsertMode={false} saveForm={formData} onFormSubmit={a} />
    </PageTemplate>
  );
}

export default AccountBookDetailPage;

function convertFormData(accountBook: IAccountBookListItem): IAccountBookSaveForm {
  const { id, title, amount, registerDateTime, category, memo = '', isRegularExpenditure } = accountBook;
  return {
    id,
    title,
    amount,
    memo,
    registerDateTime,
    category,
    type: isRegularExpenditure ? 'expenditure' : 'income'
  };
}
