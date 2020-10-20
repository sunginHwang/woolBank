import React from 'react';
import styled from 'styled-components';

import Progress from '@components/common/Progress';

import { IAccount } from '@models/IAccount';
import { parseDate } from '@support/util/date';
import { addComma } from '@support/util/String';
import palette from '@style/palette';

export interface AccountInfoProps {
  account: IAccount;
};

function AccountInfo({ account }: AccountInfoProps) {
  return (
    <S.AccountInfo>
      <S.Title data-cy='title'>
        {account.title} <span>({account.savingType.name})</span>
      </S.Title>
      <S.CurrentAmount>
        {addComma(account.currentAmount || 0)} <span>원</span>
      </S.CurrentAmount>
      <Progress
        percent={35}
        color={palette.mainColor}
        label='35'
        labelSuffix='%'
        startMessage={`개설일: ${parseDate(account.startDate)}`}
        endMessage={`만기일: ${parseDate(account.endDate)}`}
      />
      <S.Amount>
        <span>만기예상액 : </span>
        <p>{addComma(account.amount)}<span>원</span></p>
      </S.Amount>
    </S.AccountInfo>
  );
}

const S: {
  AccountInfo: any;
  Title: any;
  CurrentAmount: any;
  Amount: any;
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
  Amount: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 2rem;
    
   
    >p {
      font-size: 2.2rem;
      font-weight: bold;
      
      >span {
        margin-left: .5rem;
        font-size: 1.2rem;
        font-weight: normal;
      }
    }
  `
};

export default AccountInfo;
