import React from 'react';
import { useHistory, useParams } from 'react-router';
import { useMutation, useQuery } from 'react-query';

import PageTemplate from '@components/layout/PageTemplate';
import SaveForm from '@components/accountBook/save/SaveForm';
import SpinnerLoading from '@components/common/SpinnerLoading';
import { IAccountBookListItem } from '@models/accountBook/IAccountBookListItem';
import { IAccountBookSaveForm } from '@models/accountBook/IAccountBookSaveForm';
import { deleteAccountBook, fetchAccountBook, updateAccountBook } from '@support/api/accountBookApi';
import { useToast } from '@support/hooks/useToast';
import useUpdateEffect from '@support/hooks/useUpdateEffect';

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
  const history = useHistory();
  const onToast = useToast();
  const deleteMutation = useMutation(deleteAccountBook);
  const updateMutation = useMutation(updateAccountBook);
  const { data = initData, isFetching, isError } = useQuery<IAccountBookListItem>(['accountBook', Number(accountBookId)], () =>
    fetchAccountBook(Number(accountBookId))
  );

  const accountBookUpdateForm = convertFormData(data);

  useUpdateEffect(() => {
    if (isError) {
      onToast('존재하지 않는 페이지 입니다.');
      history.goBack();
    }
  }, [isError]);

  const onUpdateAccountBook = (accountBookUpdateForm: IAccountBookSaveForm) => {
    updateMutation.mutate(accountBookUpdateForm, {
      onSuccess: () => {
        onToast('수정되었습니다.');
      },
      onError: () => onToast('다시 시도해 주세요.')
    });
  };

  const onRemoveAccountBook = async () => {
    deleteMutation.mutate(accountBookId, {
      onSuccess: () => {
        onToast('정상적으로 삭제되었습니다.');
        history.goBack();
      },
      onError: () => onToast('다시 시도해 주세요.')
    });
  };

  const isShowLoading = isFetching || deleteMutation.isLoading || updateMutation.isLoading;

  return (
    <PageTemplate title={data.title}>
      {isShowLoading && <SpinnerLoading loading />}
      <SaveForm
        isInsertMode={false}
        saveForm={accountBookUpdateForm}
        onRemove={onRemoveAccountBook}
        onFormSubmit={onUpdateAccountBook}
      />
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
