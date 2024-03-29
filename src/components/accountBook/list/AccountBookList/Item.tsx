import React from 'react';
import styled from 'styled-components';

import { IAccountBookListItem } from '@models/accountBook/IAccountBookListItem';
import { addComma } from '@support/util/String';
import { useHistory } from 'react-router';

/**
 * 가계부 리스트 아이템
 * @component
 */

interface IProps {
  accountBookListItem: IAccountBookListItem;
}

function Item({ accountBookListItem }: IProps) {
  const history = useHistory();
  const { category, title, amount, isRegularExpenditure, type, id } = accountBookListItem;

  const onItemClick = () => {
    history.push(`/account-books/${id}`);
  };

  const isIncomeType = type === 'income';
  const displayAmount = `${addComma(isIncomeType ? amount : -amount)}원`;

  return (
    <S.Item onClick={onItemClick}>
      <div>
        <S.Category>{category.name}</S.Category>
        <S.Info>
          <span>{title}</span>
          {isRegularExpenditure && <S.Label>매월</S.Label>}
        </S.Info>
      </div>
      <S.Price useRedColor={isIncomeType}>{displayAmount}</S.Price>
    </S.Item>
  );
}

const S: {
  Item: any;
  Price: any;
  Category: any;
  Info: any;
  Label: any;
} = {
  Item: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

    > div:first-child {
      display: flex;
      justify-content: flex-start;
    }
  `,
  Price: styled.p<{
    useRedColor: boolean;
  }>`
    white-space: nowrap;
    color: ${({ theme, useRedColor }) => (useRedColor ? theme.colors.redL1 : theme.colors.blackL1)};
  `,
  Category: styled.p`
    width: 7.5rem;
    font-size: 1.2rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-right: 1rem;
    color: ${({ theme }) => theme.colors.greyD2};
  `,
  Info: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;

    > span {
      text-overflow: ellipsis;
      word-break: break-all;
      overflow-wrap: break-word;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  `,
  Label: styled.label`
    width: 2rem;
    font-size: 0.8rem;
    background-color: ${({ theme }) => theme.colors.greyL2};
    border-radius: 1.3rem;
    padding: 0.3rem 0.7rem;
    margin-left: 0.7rem;
  `
};

export default React.memo(Item);
