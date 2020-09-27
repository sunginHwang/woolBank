import React from 'react';
import styled from 'styled-components';

export interface TotalAssetsWalletProps {
  totalPrice: number;
  lastMonthTotalPrice: number;
}

function TotalAssetsWallet({ totalPrice, lastMonthTotalPrice }: TotalAssetsWalletProps) {
  const isIncreaseAsset = totalPrice > lastMonthTotalPrice;
  const isEqualAsset = totalPrice === lastMonthTotalPrice;

  const renderIncreaseAsset = isEqualAsset ? (
    <p>지난달과 동일한 자산입니다.</p>
  ) : (
    <p>
      지난달 대비
      <span> {Math.abs(totalPrice - lastMonthTotalPrice)}원</span>
      자산이 {isIncreaseAsset ? '증가' : '감소'}하였습니다.
    </p>
  );

  return (
    <S.TotalAssetsWallet>
      <div>
        <S.Wallet>
          <S.Top>
            <span>총 저축금액</span>
            <S.WalletPrice>
              {totalPrice}
              <span> 원</span>
            </S.WalletPrice>
          </S.Top>
          <S.Bottom>{renderIncreaseAsset}</S.Bottom>
        </S.Wallet>
      </div>
    </S.TotalAssetsWallet>
  );
}

const S: {
  TotalAssetsWallet: any;
  Wallet: any;
  WalletPrice: any;
  Bottom: any;
  Top: any;
} = {
  TotalAssetsWallet: styled.div`
    width: 100%;
    height: 20rem;
    margin: 2rem 0 3rem 0;
    background-color: ${({ theme }) => theme.colors.whiteL1};
    color: ${({ theme }) => theme.colors.white};
    display: flex;
    flex-direction: column;
    position: relative;

    &:before {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      content: '';
      display: block;
      height: 14rem;
      background: ${({ theme }) => theme.colors.navyD1};
    }

    > div {
      margin: 1rem 2rem 0 2rem;
      position: relative;
    }
  `,
  Wallet: styled.div`
    margin-top: 3.6rem;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 1.5rem;
    box-shadow: 0 0.1rem 0.3rem 0 rgba(0, 0, 0, 0.09);
    padding: 2rem 2rem;
  `,
  WalletPrice: styled.p`
    display: flex;
    align-items: center;
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 0.4rem;
    color: ${({ theme }) => theme.colors.navyD1};

    > span {
      margin-left: 0.4rem;
      font-size: 2rem;
      font-weight: normal;
    }
  `,
  Top: styled.div`
    > span {
      color: ${({ theme }) => theme.colors.blackL1};
      font-size: 1.5rem;
    }
  `,
  Bottom: styled.div`
    border-top: 0.1rem solid ${({ theme }) => theme.colors.greyL6};
    padding-top: 2rem;

    > p {
      color: ${({ theme }) => theme.colors.blackL1};
      font-size: 1.4rem;

      > span {
        font-weight: bold;
        color: ${({ theme }) => theme.colors.navyD1};
      }
    }
  `
};

export default TotalAssetsWallet;
