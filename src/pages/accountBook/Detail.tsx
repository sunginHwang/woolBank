import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';

import PageTemplate from '@components/layout/PageTemplate';
import SaveForm from '@components/accountBook/save/SaveForm';
import SpinnerLoading from '@components/common/SpinnerLoading';
import { IAccountBookListItem } from '@models/accountBook/IAccountBookListItem';
import { IAccountBookSaveForm } from '@models/accountBook/IAccountBookSaveForm';
import { fetchAccountBook } from '@support/api/accountBookApi';

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

  const accountBookUpdateForm = convertFormData(data);

  const updateAccountBook = (accountBookUpdateForm: IAccountBookSaveForm) => {
    console.log(accountBookUpdateForm);
  }

  return (
    <PageTemplate title={data.title}>
      {isFetching && <SpinnerLoading loading />}
      <SaveForm isInsertMode={false} saveForm={accountBookUpdateForm} onFormSubmit={updateAccountBook} />
    </PageTemplate>
  );
}

export default AccountBookDetailPage;

// form 데이터로 컨버팅
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
