import React from 'react';
import styled from 'styled-components';
import { IDepositRecord } from '../../models/IDepositRecord';
import { DATE_FORMAT, parseDate } from '../../support/util/date';
import { addComma } from '../../support/util/String';

type DepositRecordItemProps = {
  depositRecord: IDepositRecord;
};

function DepositRecordItem({ depositRecord }: DepositRecordItemProps) {
  return (
    <S.DepositRecordItem>
      <S.Info>
        <p>{parseDate(depositRecord.depositDate, DATE_FORMAT.YYYY_MM_DD)}</p>
        <span>잔액: {addComma(depositRecord.balance)}원</span>
      </S.Info>
      <S.Amount>{addComma(depositRecord.amount)}원</S.Amount>
    </S.DepositRecordItem>
  );
}

const S: {
  DepositRecordItem: any;
  Info : any;
  Amount: any;
} = {
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
      color: ${props => props.theme.colors.blackL1};
      font-weight: bold;
      margin-bottom: .4rem;
    }
    
    > span {
      font-size: 1.2rem;
      color: ${props => props.theme.colors.blackL1};
    }
  `,
  Amount: styled.div`
    font-size: 2rem;
    color: ${props => props.theme.colors.navyD1};
    font-weight: bold;
  `
};

export default DepositRecordItem;
