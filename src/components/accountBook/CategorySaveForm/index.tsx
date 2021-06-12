import React from 'react';
import styled from 'styled-components';

import PageHeader from '@components/common/PageHeader';
import BaseInput from '@components/common/BaseInput';
import BottomButton from '@components/common/BottomButton';
import useInput from '@support/hooks/UseInput';
import { useToast } from '@support/hooks/useToast';
import getCategoryMsg from '@support/util/accountBook/getCategoryMsg';
import { AccountBookCategoryType } from '@models/accountBook/AccountBookCategoryType';
import { ISaveAccountBookCategory } from '@/services/accountBook/useAccountBookCategories';

interface IProps {
  type: AccountBookCategoryType;
  isLoading: boolean;
  saveAccountBookCategory: ({ name, type, onSuccessCb }: ISaveAccountBookCategory) => void;
  onClose: () => void;
}

/**
 * 가계부 지출/수입 카테고리 작성 폼
 * @component
 */

function CategorySaveForm(props: IProps) {
  const { type, onClose, isLoading, saveAccountBookCategory } = props;
  const [categoryName, onChangeCategoryName, onReset] = useInput('');
  const onToast = useToast();

  const typeMsg = getCategoryMsg(type);

  const onAddCategoryClick = () => {
    if (categoryName.length >= 20) {
      onToast('최대 20글자 까지 가능합니다.');
      return;
    }
    saveAccountBookCategory({
      name: categoryName,
      type,
      onSuccessCb: () => onClose()
    });
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
        loading={isLoading}
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
