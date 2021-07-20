import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router';

import { IAccountBookListItem } from '@models/accountBook/IAccountBookListItem';
import { IAccountBookSaveForm } from '@models/accountBook/IAccountBookSaveForm';
import { useToast } from '@support/hooks/useToast';
import { deleteAccountBook, fetchAccountBook, updateAccountBook } from '@support/api/accountBookApi';
import { useAccountBookQuerySetter } from '@/services/accountBook/useAccountBookList';

export const initData: IAccountBookListItem = {
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

function useAccountBookDetail(accountBookId: number) {
  const queryClient = useQueryClient();
  const history = useHistory();
  const onToast = useToast();
  const deleteMutation = useMutation(deleteAccountBook);
  const updateMutation = useMutation(updateAccountBook);
  const { remove: removeList, update: updateList } = useAccountBookQuerySetter();

  const queryKey = ['accountBook', accountBookId];

  const {
    data = initData,
    isFetching,
    isError
  } = useQuery<IAccountBookListItem>(queryKey, () => fetchAccountBook(accountBookId));

  const modifyAccountBook = (accountBookUpdateForm: IAccountBookSaveForm) => {
    updateMutation.mutate(accountBookUpdateForm, {
      onSuccess: (updatedAccountBook) => {
        // 수정 후 상세 및 리스트 갱신
        queryClient.setQueryData<IAccountBookListItem>(queryKey, () => updatedAccountBook);
        updateList(updatedAccountBook);
        onToast('수정되었습니다.');
      },
      onError: () => onToast('다시 시도해 주세요.')
    });
  };

  const removeAccountBook = async () => {
    deleteMutation.mutate(accountBookId, {
      onSuccess: () => {
        // 삭제 후 상세 및 리스트 갱신
        removeList(Number(accountBookId));
        queryClient.setQueryData<IAccountBookListItem>(queryKey, () => {
          return initData;
        });
        onToast('정상적으로 삭제되었습니다.');
        history.goBack();
      },
      onError: () => onToast('다시 시도해 주세요.')
    });
  };

  const isLoading = isFetching || deleteMutation.isLoading || updateMutation.isLoading;

  return {
    data,
    isLoading,
    isError,
    modifyAccountBook,
    removeAccountBook
  };
}

export default useAccountBookDetail;
