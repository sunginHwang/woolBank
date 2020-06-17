import React from 'react';
import styled from 'styled-components';

type WalletListItemProps = {
  title: string;
  asset: number;
}

function WalletListItem({
                          title,
                          asset
                        }: WalletListItemProps) {
  return (
    <S.WalletListItem>
      <p>{title}</p>
      <S.RightArea>
        <p>{asset}</p>
      </S.RightArea>
    </S.WalletListItem>
  );
}

const S: {
  WalletListItem: any;
  RightArea: any;
} = {
  WalletListItem: styled.div`
    padding: 2rem;
    height: 5rem;
    background-color: ${props => props.theme.colors.white};
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    border-radius: .8rem;
  `,
  RightArea: styled.div``

};

export default React.memo(WalletListItem);