import React from 'react';
import styled from 'styled-components';
import { IAccount } from '../../models/IAccount';
import { addComma } from '../../support/util/String';
import Progress from '../common/Progress';
import colors from '../../style/colors';
import { DATE_FORMAT, parseDate } from '../../support/util/date';

type AccountInfoProps = {
  account: IAccount;
};

function AccountInfo({ account }: AccountInfoProps) {
  return (
    <S.AccountInfo>
      <S.Title>
        {account.title} <span>({account.savingType.name})</span>
      </S.Title>
      <S.CurrentAmount>
        {addComma(account.currentAmount || 0)} <span>원</span>
      </S.CurrentAmount>
      <Progress
        percent={35}
        color={colors.colors.navyD1}
        startMessage={`개설일: ${parseDate(
          account.startDate,
          DATE_FORMAT.YYYY_MM_DD
        )}`}
        endMessage={`만기일: ${parseDate(
          account.endDate,
          DATE_FORMAT.YYYY_MM_DD
        )}`}
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
    margin: 4rem 0 4rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${(props) => props.theme.colors.blackL1};
  `,
  Title: styled.p`
    font-size: 2.2rem;
    margin-bottom: 1rem;
    > span {
      font-size: 1.2rem;
      color: ${(props) => props.theme.colors.greyL1};
    }
  `,
  CurrentAmount: styled.p`
    font-size: 4.4rem;
    font-weight: bold;
    color: ${(props) => props.theme.colors.navyD1};
    margin-bottom: 3rem;

    > span {
      font-size: 3.4rem;
      font-weight: normal;
    }
  `,
  Amount: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 2rem;
    
    >span {
      font-size: 1.6rem;
    }
    
    >p {
      font-size: 2.4rem;
      font-weight: bold;
      
      >span {
        font-size: 1.4rem;
        font-weight: normal;
      }
    }
  `
};

export default AccountInfo;
