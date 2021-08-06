import React from 'react';
import styled from 'styled-components';

import { parseDate } from '@support/util/date';
import { addComma } from '@support/util/String';
import { IDeposit } from '@models/bucketList/IDeposit';

interface IProps {
  deposit: IDeposit;
}

/**
 * 예적금 상세 - 입금 리스트 아이템
 * @component
 */

function Item({ deposit }: IProps) {
  return (
    <S.DepositRecordItem>
      <S.Info>
        <p>{parseDate(deposit.depositDate)}</p>
        <span>잔액: {addComma(deposit.prevTotalAmount)}원</span>
      </S.Info>
      <S.Amount>{addComma(deposit.amount)}원</S.Amount>
    </S.DepositRecordItem>
  );
}

const S = {
  DepositRecordItem: styled.div`
    display: flex;
    padding: 2rem 0;
    justify-content: space-between;
    align-items: center;
  `,
  Info: styled.div`
    display: flex;
    flex-direction: column;

    > p {
      font-size: 1.4rem;
      color: ${({ theme }) => theme.colors.blackL1};
      font-weight: bold;
      margin-bottom: 0.4rem;
    }

    > span {
      font-size: 1.2rem;
      color: ${({ theme }) => theme.colors.blackL1};
    }
  `,
  Amount: styled.div`
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.mainColor};
    font-weight: bold;
  `
};

export default Item;
