import React from 'react';
import styled from 'styled-components';

import { IAccountBookListItem } from '@models/accountBook/IAccountBookListItem';
import { addComma } from '@support/util/String';

/**
 * 가계부 리스트 아이템
 * @component
 */

interface IProps {
  accountBookListItem: IAccountBookListItem;
}

function Item({ accountBookListItem }: IProps) {
  const { categoryName, title, amount, isRegularExpenditure, type } = accountBookListItem;
  const isIncomeType = type ==='income';

  const displayAmount = `${addComma(isIncomeType ? amount : -amount)}원`;
  return (
    <S.Item>
      <div>
        <S.Category>{categoryName}</S.Category>
        <S.Info>
          <span>{title}</span>{isRegularExpenditure && <S.Label>정기지출</S.Label>}
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
    margin-bottom: 1rem;

    > div:first-child {
      display: flex;
      justify-content: flex-start;
    }
    
  `,
  Price: styled.p<{
    useRedColor: boolean;
  }>`
    font-weight: 600;
    color: ${({ theme, useRedColor }) => useRedColor ? theme.colors.redL1 : theme.colors.blackL1 };
  `,
  Category: styled.p`
    width: 6rem;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.greyD2};
  `,
  Info: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
  `,
  Label: styled.label`
    font-size: 1rem;
    background-color: ${({ theme }) => theme.colors.greyL2};
    border-radius: 1.3rem;
    padding: .5rem .7rem;
    margin-left: .5rem;
  `,
}

export default Item;
