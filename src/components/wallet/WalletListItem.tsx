import React from 'react';
import styled from 'styled-components';
import { IWallet } from '../../models/IWallet';

type WalletListItemProps = {
  wallet: IWallet;
}

function WalletListItem({
                          wallet: {
                            title,
                            asset,
                            type,
                            endAt,
                            maturityPrice
                          }
                        }: WalletListItemProps) {
  return (
    <S.WalletListItem>
      <S.Top>
        <p>{title}</p>
        <span>{type} ></span>
      </S.Top>
      <S.Content>
        <p>{asset} <span>원</span></p>
      </S.Content>
      <S.Bottom>
        <p>만기일 : {endAt}</p>
        <span>만기금액 : {maturityPrice}원</span>
      </S.Bottom>
    </S.WalletListItem>
  )
    ;
}


const S: {
  WalletListItem: any;
  Top: any;
  Content: any;
  Bottom: any;
} = {
  WalletListItem: styled.div`
    padding: 2rem;
    background-color: ${props => props.theme.colors.white};
    display: flex;
    flex-direction: column;
    margin-bottom: 1.6rem;
    border-radius: 1.2rem;
    color: ${props => props.theme.colors.blackL1};
  `,
  Top: styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 1.8rem;    
    margin-bottom: .3rem;
    
    span{
     font-size: 1.4rem; 
     color: ${props => props.theme.colors.greyD2};
    }
  `,
  Content: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: .8rem;
    
    p{
      font-size: 2.4rem;
      font-weight: bold;
    }
    
    span{
      font-size: 1.4rem;
      font-weight: normal;
    }
  `,
  Bottom: styled.div`
    font-size: 1.2rem;
    display: flex;
    justify-content: space-between;
    p{
      color: ${props => props.theme.colors.greyL1};
    }
    
    span{
      color: ${props => props.theme.colors.greyD2};
    }
  `
};

export default React.memo(WalletListItem);