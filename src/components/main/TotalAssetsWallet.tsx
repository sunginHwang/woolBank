import React from 'react';
import styled from 'styled-components';

type TotalAssetsWalletProps = {
  totalPrice: number;
}

function TotalAssetsWallet({ totalPrice }: TotalAssetsWalletProps) {
  return (
    <S.TotalAssetsWallet>
      <div>
        <h3>총 자산</h3>
        <S.Wallet>
          <p>{totalPrice}</p>
        </S.Wallet>
      </div>
    </S.TotalAssetsWallet>
  );
}

const S: {
  TotalAssetsWallet: any;
  Wallet: any;
} = {
  TotalAssetsWallet: styled.div`
    width: 100%;
    height: 30rem;
    background-color: ${props => props.theme.colors.whiteL1};
    color: ${props => props.theme.colors.white};
    display: flex;
    flex-direction: column;
    position: relative;
    &:before{
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      content: "";
      display: block;
      height: 15rem;
      background: ${props => props.theme.colors.navyD1};;
    }

    >div{
      margin: 1rem 2rem 0 2rem;
      position: relative;
    }

    h3 {
      font-size: 2.4rem;
      color: ${props => props.theme.colors.cyanL1};
      margin: 4rem 0 1rem 0;
      padding: 0;
    }

    p {
      font-size: 1.2rem;
      color: ${props => props.theme.colors.cyanL1};
    }
  `,
  Wallet: styled.div`
    height: 6rem;
    background-color: ${props => props.theme.colors.white};
    border-radius: 1.5rem;
    box-shadow: 0 .1rem .3rem 0 rgba(0,0,0,0.09);
    padding: 2rem 3rem;
  `

};

export default TotalAssetsWallet;
