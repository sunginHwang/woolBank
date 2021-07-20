import { useQuery, useQueryClient } from 'react-query';
import { IAccountBookListItem } from '@models/accountBook/IAccountBookListItem';
import { fetchAccountBookList } from '@support/api/accountBookApi';
import { useCallback } from 'react';

export const QUERY_KEY = 'accountBookList';

export default function useAccountBookListQuery(selectedDate: string) {
  return useQuery<IAccountBookListItem[]>(QUERY_KEY, () => fetchAccountBookList(selectedDate), {
    refetchOnMount: false
  });
}

export function useAccountBookQuerySetter() {
  const queryClient = useQueryClient();

  const set = useCallback(
    (accountBookList: IAccountBookListItem[]) => {
      queryClient.setQueryData<IAccountBookListItem[]>(QUERY_KEY, accountBookList);
    },
    [queryClient]
  );

  const add = useCallback(
    (accountBook: IAccountBookListItem) => {
      queryClient.setQueryData<IAccountBookListItem[]>(QUERY_KEY, (prev = []) => [...prev, accountBook]);
    },
    [queryClient]
  );

  const update = useCallback(
    (accountBook: IAccountBookListItem) => {
      queryClient.setQueryData<IAccountBookListItem[]>(QUERY_KEY, (prev = []) => {
        return prev.map((item) => (accountBook.id === item.id ? accountBook : item));
      });
    },
    [queryClient]
  );

  const remove = useCallback(
    (removeId: number) => {
      queryClient.setQueryData<IAccountBookListItem[]>(QUERY_KEY, (prev = []) => {
        return prev.filter(item => removeId !== item.id);
      });
    },
    [queryClient]
  );

  return {
    set,
    add,
    update,
    remove,
  };
}
