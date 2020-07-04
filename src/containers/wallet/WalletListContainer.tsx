import React, { useState } from 'react';
import { IWallet } from '../../models/IWallet';
import WalletListItem2 from '../../components/wallet/WalletListItem2';
import styled from 'styled-components';
import ToggleTab from '../../components/common/ToggleTab';
import NavigationBar from '../../components/layout/NavigationBar';

const assets: IWallet[] = [
  {
    title: '첫 고정적금',
    asset: 30000,
    maturityPrice: 300000,
    type: '고정적금',
    endAt: '2022-02-24'
  },
  {
    title: '첫 자유적금',
    asset: 3000000,
    maturityPrice: 5000000,
    type: '자유적금',
    endAt: '2021-03-24'
  },
  {
    title: '첫 자유적금',
    asset: 3000000,
    maturityPrice: 5000000,
    type: '정기예금',
    endAt: '2021-03-24'
  }
];

function WalletListContainer() {
  const tabs = ['진행중', '완료'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <>
      <S.Wrapper>
        <ToggleTab tabs={tabs} activeTab={activeTab} onChangeTab={setActiveTab}/>
        <S.List>
          {assets.map((wallet, index) => (
            <WalletListItem2 key={index} wallet={wallet}/>
          ))}
        </S.List>
        <NavigationBar activeNavBar='home'/>
      </S.Wrapper>
    </>
  );
}

export default WalletListContainer;

const S: {
  Wrapper: any;
  List: any;
} = {
  Wrapper: styled.div`
    margin: 1rem 1rem 0 1rem;
  `,
  List: styled.div`
    margin-top: 2rem;
  `
};
