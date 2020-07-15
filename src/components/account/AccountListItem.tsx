import React from 'react';
import styled from 'styled-components';
import CardItem from '../common/CardItem';
import { addComma } from '../../support/util/String';
import colors from '../../style/colors';
import IcoPiggyBank from '../icon/IcoPiggyBank';
import IcoCashUsd from '../icon/IcoCashUsd';
import IcoCurrencyUsdCircle from '../icon/IcoCurrencyUsdCircle';
import { IAccount } from '../../models/IAccount';
import { DATE_FORMAT, parseDate } from '../../support/util/date';
import { SAVING_TYPE } from '../../support/constants';
import { Link } from 'react-router-dom';
type WalletListItemProps = {
  account: IAccount;
};

function AccountListItem({
  account: { id, title, savingType, endDate, amount, currentAmount }
}: WalletListItemProps) {
  const walletIcon = () => {
    if (savingType.type === SAVING_TYPE.REGULAR_INSTALLMENT_SAVINGS) {
      return (
        <IcoPiggyBank height={14} width={14} fill={colors.colors.greyD2} />
      );
    }

    if (savingType.type === SAVING_TYPE.REGULAR_DEPOSIT) {
      return <IcoCashUsd height={14} width={14} fill={colors.colors.greyD2} />;
    }

    if (savingType.type === SAVING_TYPE.FREE_INSTALLMENT_SAVINGS) {
      return (
        <IcoCurrencyUsdCircle
          height={14}
          width={14}
          fill={colors.colors.greyD2}
        />
      );
    }

    return '';
  };
  return (
    <Link to={`/accounts/${id}`}>
      <CardItem>
        <S.Top>
          <p>{title}</p>
          <div>
            <span>{savingType.name}</span>
            {walletIcon()}
          </div>
        </S.Top>
        <S.Content>
          <p>
            {addComma(currentAmount || 0)} <span>원</span>
          </p>
        </S.Content>
        <S.Bottom>
          <p>만기일 : {parseDate(endDate, DATE_FORMAT.YYYY_MM_DD)}</p>
          <span>만기금액 : {addComma(amount)}원</span>
        </S.Bottom>
        <S.Progress>
          <div />
        </S.Progress>
      </CardItem>
    </Link>
  );
}

const S: {
  Top: any;
  Content: any;
  Bottom: any;
  Progress: any;
} = {
  Top: styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 1.8rem;
    margin-bottom: 0.3rem;

    span {
      font-size: 1.4rem;
      margin: 0.2rem 0.5rem 0 0;
      color: ${(props) => props.theme.colors.greyD2};
    }

    > div {
      display: flex;
      align-items: center;
    }
  `,
  Content: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 0.8rem;

    p {
      font-size: 2.4rem;
      font-weight: bold;
      color: ${(props) => props.theme.colors.navyD1};
    }

    span {
      font-size: 1.4rem;
      font-weight: normal;
    }
  `,
  Bottom: styled.div`
    font-size: 1.2rem;
    display: flex;
    justify-content: space-between;
    p {
      opacity: 0.7;
      color: ${(props) => props.theme.colors.greyL1};
    }

    span {
      opacity: 0.7;
      color: ${(props) => props.theme.colors.navyD1};
    }
  `,
  Progress: styled.div`
    margin-top: 1.6rem;
    height: 0.1rem;
    border-radius: 0.3rem;
    background-color: ${(props) => props.theme.colors.greyL2};

    div {
      width: 80%;
      height: 100%;
      background-color: ${(props) => props.theme.colors.navyD1};
    }
  `
};

export default React.memo(AccountListItem);
