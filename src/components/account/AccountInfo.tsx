import React from 'react';
import styled from 'styled-components';

import Progress from '@components/common/Progress';

import { IAccount } from '@models/IAccount';
import { getRemainDatePercentage, parseDate } from '@support/util/date';
import { addComma } from '@support/util/String';
import palette from '@style/palette';
import { getRateInterestByWallet } from '@support/util/bank';

export interface AccountInfoProps {
  account: IAccount;
}

function AccountInfo({ account }: AccountInfoProps) {
  const rateInterest = getRateInterestByWallet(account);
  const { rate, startDate, endDate, title, savingType, currentAmount, amount } = account;

  const remainPercent = getRemainDatePercentage(startDate, endDate);
  const ratePercent = `${(rate * 100).toFixed(2)}%`;

  return (
    <S.AccountInfo>
      <S.Title data-cy='title'>
        {title} <span>({savingType.name})</span>
      </S.Title>
      <S.CurrentAmount>
        {addComma(currentAmount || 0)} <span>원</span>
      </S.CurrentAmount>
      <Progress
        percent={remainPercent}
        color={palette.mainColor}
        label={remainPercent}
        labelSuffix='%'
        startMessage={`개설일: ${parseDate(startDate)}`}
        endMessage={`만기일: ${parseDate(endDate)}`}
      />
      <S.Amount isRoot={true}>
        <span>만기예상액 : </span>
        <p>
          {addComma(amount)}
          <span>원</span>
        </p>
      </S.Amount>
      <S.Amount>
        <span>
          예상 이자 <S.Info>({ratePercent})</S.Info>
        </span>
        <S.Interest>
          {addComma(rateInterest)}
          <span>원</span>
        </S.Interest>
      </S.Amount>
      {account.savingType.type === 'regularInstallmentSavings' && (
        <S.Amount>
          <span>정기 입금일</span>
          <S.Interest>
            {account.regularTransferDate}
            <span>일</span>
          </S.Interest>
        </S.Amount>
      )}
    </S.AccountInfo>
  );
}

const S: {
  AccountInfo: any;
  Title: any;
  CurrentAmount: any;
  Amount: any;
  Interest: any;
  Info: any;
} = {
  AccountInfo: styled.div`
    padding: 4rem 2rem;
    display: flex;
    background-color: ${({ theme }) => theme.colors.white};
    flex-direction: column;
    align-items: center;
    color: ${({ theme }) => theme.colors.blackL1};
  `,
  Title: styled.p`
    font-size: 2rem;
    margin-bottom: 1rem;
    > span {
      font-size: 1.2rem;
      color: ${({ theme }) => theme.colors.greyL1};
    }
  `,
  CurrentAmount: styled.p`
    font-size: 4.2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.mainColor};
    margin-bottom: 3rem;

    > span {
      font-size: 3rem;
      font-weight: normal;
    }
  `,
  Amount: styled.div<{
    isRoot: boolean;
  }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: ${({ isRoot }) => isRoot ? '3rem' : '1rem'};
    
    > p {
      font-size: 2.2rem;
      font-weight: bold;

      > span {
        margin-left: 0.5rem;
        font-size: 1.4rem;
        font-weight: normal;
      }
    }
  `,
  Interest: styled.p`
    font-size: 1.8rem !important;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.greyD2};
  `,
  Info: styled.strong`
    font-size: 1.2rem;
    font-weight: normal;
    color: ${({ theme }) => theme.colors.greyD2};
  `
};

export default AccountInfo;
