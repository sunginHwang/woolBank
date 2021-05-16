import React from 'react';
import { useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import PageHeader from '@components/common/PageHeader';
import BaseInput from '@components/common/BaseInput';
import BottomButton from '@components/common/BottomButton';
import useInput from '@support/hooks/UseInput';
import { useToast } from '@support/hooks/useToast';
import { useUserId } from '@support/hooks/useUser';
import getCategoryMsg from '@support/util/accountBook/getCategoryMsg';
import { addAccountBookCategory } from '@support/api/accountBookApi';
import { IAccountBookCategory } from '@models/accountBook/IAccountBookCategory';
import { AccountBookCategoryType } from '@models/accountBook/AccountBookCategoryType';
import accountBookRecoil from '@/recoils/accountBook';

const {
  atoms: { accountBookCategoriesState }
} = accountBookRecoil;

interface IProps {
  type: AccountBookCategoryType;
  onClose: () => void;
}

/**
 * 가계부 지출/수입 카테고리 작성 폼
 * @component
 */

function CategorySaveForm(props: IProps) {
  const { type, onClose } = props;
  const [categoryName, onChangeCategoryName, onReset] = useInput('');
  const userId = useUserId();
  const onToast = useToast();
  const setCategoryState = useSetRecoilState(accountBookCategoriesState);
  const saveCategoryMutation = useMutation(addAccountBookCategory);
  const typeMsg = getCategoryMsg(type);

  const onAddCategoryClick = () => {
    if (categoryName.length >= 20) {
      onToast('최대 20글자 까지 가능합니다.');
      return;
    }

    saveCategoryMutation.mutate(
      { name: categoryName, type, userId },
      {
        onSuccess: (category: IAccountBookCategory) => {
          onToast('카테고리가 생성되었습니다.');
          setCategoryState((prev) => [...prev, category]);
          onClose();
        },
        onError: () => onToast('다시 시도해 주세요.')
      }
    );
  };

  return (
    <S.CategorySave>
      <PageHeader title={`${typeMsg} 카테고리 작성`} onBackClick={onClose} />
      <S.InputArea>
        <BaseInput
          label={`${typeMsg} 카테고리`}
          placeHolder={`추가하실 ${typeMsg} 카테고리를 작성해 주세요.`}
          value={categoryName}
          onChange={onChangeCategoryName}
          onClear={onReset}
        />
      </S.InputArea>
      <BottomButton
        isShow
        loading={saveCategoryMutation.isLoading}
        message='추가하기'
        active={categoryName.length > 0}
        onClick={onAddCategoryClick}
      />
    </S.CategorySave>
  );
}

export default CategorySaveForm;

const S = {
  CategorySave: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.white};
    z-index: ${({ theme }) => theme.zIndex.fullDeem};
  `,
  InputArea: styled.div`
    margin-top: 7.5rem;
    padding: 0 2rem;
  `
};
