import React from 'react';
import styled from 'styled-components';
import { IWallet } from '../../models/IWallet';
import WalletListItem from './WalletListItem';

type WalletListProps = {
  wallets: IWallet[];
}


function WalletList({ wallets }: WalletListProps) {
  return (
    <S.WalletList>
      {
        wallets.map((wallet, index) => {
          return <WalletListItem key={index}
                                 wallet={wallet}/>;
        })
      }
    </S.WalletList>
  );
}

export default WalletList;

const S: {
  WalletList: any;
} = {
  WalletList: styled.div`
    margin: 0 2rem;
  `
};