import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';

import PageTemplate from '@components/layout/PageTemplate';
import SaveForm from '@components/accountBook/save/SaveForm';
import SpinnerLoading from '@components/common/SpinnerLoading';
import { IAccountBookListItem } from '@models/accountBook/IAccountBookListItem';
import { IAccountBookSaveForm } from '@models/accountBook/IAccountBookSaveForm';
import { useToast } from '@support/hooks/useToast';
import useAccountBookDetail from '@/services/accountBook/useAccountBookDetail';

/**
 * 가계부 상세 페이지
 * @component
 */

function AccountBookDetailPage() {
  const { accountBookId } = useParams<{ accountBookId: string }>();
  const history = useHistory();
  const onToast = useToast();
  const { data, isLoading, isError, modifyAccountBook, removeAccountBook } = useAccountBookDetail(
    Number(accountBookId)
  );

  const accountBookUpdateForm = convertFormData(data);

  useEffect(() => {
    if (isError) {
      onToast('존재하지 않는 페이지 입니다.');
      history.goBack();
    }
  }, [isError, onToast, history]);

  return (
    <PageTemplate title={data.title}>
      {isLoading && <SpinnerLoading loading />}
      <SaveForm
        isInsertMode={false}
        saveForm={accountBookUpdateForm}
        onRemove={removeAccountBook}
        onFormSubmit={modifyAccountBook}
      />
    </PageTemplate>
  );
}

export default AccountBookDetailPage;

// form 데이터로 컨버팅
function convertFormData(accountBook: IAccountBookListItem): IAccountBookSaveForm {
  const { id, title, amount, registerDateTime, category, memo = '', type } = accountBook;
  return {
    id,
    title,
    amount,
    memo,
    registerDateTime,
    category,
    type
  };
}
