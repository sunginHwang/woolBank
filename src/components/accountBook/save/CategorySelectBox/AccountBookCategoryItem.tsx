import React from 'react';
import styled from 'styled-components';
import { IAccountBookCategory } from '@models/accountBook/IAccountBookCategory';

export interface IProps {
  accountBookCategory: IAccountBookCategory;
  isActive: boolean;
  onSelect: (accountBookCategory: IAccountBookCategory) => void;
}

/**
 * 가계부 카테고리 선택 영역 Item
 * @component
 */

function AccountBookCategoryItem(props: IProps) {
  const { accountBookCategory, isActive, onSelect } = props;

  const onCategoryClick = () => {
    onSelect(accountBookCategory);
  };

  return (
    <S.AccountBookCategoryItem isActive={isActive} onClick={onCategoryClick}>
      {accountBookCategory.name}
    </S.AccountBookCategoryItem>
  );
}

const S: {
  AccountBookCategoryItem: any;
} = {
  AccountBookCategoryItem: styled.div<{ isActive: boolean }>`
    height: 6rem;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.blackL1};
    background-color: ${({ theme, isActive }) => (isActive ? theme.colors.greyL2 : theme.colors.white)};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.8rem;
  `
};

export default AccountBookCategoryItem;
