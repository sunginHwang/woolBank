import React from 'react';
import styled from 'styled-components';
import { IWallet } from '../../models/IWallet';
import CardItem from '../common/CardItem';
import { addComma } from '../../support/util/String';
import colors from '../../style/colors';
import IcoPiggyBank from '../icon/IcoPiggyBank';
import IcoCashUsd from '../icon/IcoCashUsd';
import IcoCurrencyUsdCircle from '../icon/IcoCurrencyUsdCircle';

type WalletListItemProps = {
  wallet: IWallet;
};

function WalletListItem2({
  wallet: { title, asset, type, endAt, maturityPrice }
}: WalletListItemProps) {
  const walletIcon = () => {
    if (type === '고정적금') {
      return (
        <IcoPiggyBank height={18} width={18} fill={colors.colors.greyD2} />
      );
    }

    if (type === '정기예금') {
      return (
        <IcoCashUsd height={18} width={18} fill={colors.colors.greyD2} />
      );
    }

    if (type === '자유적금') {
      return (
        <IcoCurrencyUsdCircle height={18} width={18} fill={colors.colors.greyD2} />
      );
    }

    return '';
  };
  return (
    <CardItem>
      <S.Top>
        <p>{title}</p>
        <div>
          <span>{type}</span>
          {walletIcon()}
        </div>
      </S.Top>
      <S.Content>
        <p>
          {addComma(asset)} <span>원</span>
        </p>
      </S.Content>
      <S.Bottom>
        <p>만기일 : {endAt}</p>
        <span>만기금액 : {addComma(maturityPrice)}원</span>
      </S.Bottom>
      <S.Progress>
        <div/>
      </S.Progress>
    </CardItem>
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
      color: ${(props) => props.theme.colors.greyD2};
      margin-right: 0.5rem;
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
    height: .1rem;
    border-radius: .3rem;
    background-color: ${(props) => props.theme.colors.greyL2};
    
    div {
      width: 80%;
      height: 100%;
      background-color: ${(props) => props.theme.colors.navyD1};
    }
    
  `
};

export default React.memo(WalletListItem2);
