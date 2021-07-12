import React from 'react';
import { useRecoilValue } from 'recoil';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { format } from 'date-fns';

import PageTemplate from '@components/layout/PageTemplate';
import SaveForm from '@components/accountBook/save/SaveForm';
import { IAccountBookListItem } from '@models/accountBook/IAccountBookListItem';
import { IAccountBookSaveForm } from '@models/accountBook/IAccountBookSaveForm';
import { useAccountBookQuerySetter } from '@/services/accountBook/useAccountBookList';
import { useToast } from '@support/hooks/useToast';
import { addAccountBook } from '@support/api/accountBookApi';
import accountBookState from '@/recoils/accountBook';

function SaveAccountBook() {
  const history = useHistory();
  const onToast = useToast();
  const { add } = useAccountBookQuerySetter();
  const addAccountBookMutation = useMutation(addAccountBook);
  const accountBookListDate = useRecoilValue(accountBookState.atoms.listDateState);

  const saveAccountBook = (saveAccountBookForm: IAccountBookSaveForm) => {
    addAccountBookMutation.mutate(saveAccountBookForm, {
      onSuccess: (accountBook: IAccountBookListItem) => {
        const registerDateMonth = format(accountBook.registerDateTime, 'yyyy-MM');
        if (registerDateMonth === accountBookListDate) {
          add(accountBook);
        }
        history.goBack();
      },
      onError: () => onToast('다시 시도해 주세요.')
    });
  };

  return (
    <PageTemplate title='거래 내역 추가'>
      <SaveForm isInsertMode onFormSubmit={saveAccountBook} />
    </PageTemplate>
  );
}

export default SaveAccountBook;
