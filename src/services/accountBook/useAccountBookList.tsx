import { useQuery } from 'react-query';
import { IAccountBookListItem } from '@models/accountBook/IAccountBookListItem';
import { fetchAccountBookList } from '@support/api/accountBookApi';

export const QUERY_KEY = 'accountBookList';

export default function useAccountBookListQuery(selectedDate: string) {
  return useQuery<IAccountBookListItem[]>(QUERY_KEY, () => fetchAccountBookList(selectedDate), {
    refetchOnMount: false
  });
}
