import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';

import accountBook from '@/recoils/accountBook';
import { IAccountBookCategory } from '@models/accountBook/IAccountBookCategory';
import { AccountBookCategoryType } from '@models/accountBook/AccountBookCategoryType';
import { addAccountBookCategory, fetchAccountBookCategories } from '@support/api/accountBookApi';
import { useToast } from '@support/hooks/useToast';

/*
 * 가계부 카테고리 fetch, 수정, 삭제 훅
 * */

export default function useAccountBookCategories() {
  const onToast = useToast();
  const [accountBookCategories, setAccountBookCategories] = useRecoilState(accountBook.atoms.accountBookCategoriesState);
  const onFetch = useMutation(fetchAccountBookCategories);
  const saveCategoryMutation = useMutation(addAccountBookCategory);

  useEffect(() => {
    if (accountBookCategories.length === 0) {
      onFetch.mutate(undefined, {
        onSuccess: (accountBookCategories: IAccountBookCategory[]) => setAccountBookCategories(accountBookCategories),
        onError: () => onToast('카테고리 정보 조회 실패')
      });
    }
  }, []);

  const saveAccountBookCategory = ({ name, type, onSuccessCb }: ISaveAccountBookCategory) => {
    saveCategoryMutation.mutate(
      { name, type },
      {
        onSuccess: (category: IAccountBookCategory) => {
          onToast('카테고리가 생성되었습니다.');
          setAccountBookCategories((prev) => [...prev, category]);
          onSuccessCb && onSuccessCb(category);
        },
        onError: () => onToast('다시 시도해 주세요.')
      }
    );
  };

  return {
    accountBookCategories,
    saveAccountBookCategory,
    saveLoading: saveCategoryMutation.isLoading
  };
}

export interface ISaveAccountBookCategory {
  name: string;
  type: AccountBookCategoryType;
  onSuccessCb?: (category: IAccountBookCategory) => void;
  onErrorCb?: () => void;
}
