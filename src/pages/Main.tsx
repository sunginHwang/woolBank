import React from 'react';
import TotalAssetsWallet from '../components/main/TotalAssetsWallet';
import MainCardArea from '../components/main/MainCardArea';
import BucketListItem from '../components/bucketList/BucketList/BucketListItem';
import { IBucketList } from '../models/IBucketList';
import Header from '../components/layout/Header';
import NavigationBar from '../components/layout/NavigationBar';
import { IAccount } from '../models/IAccount';
import { INSTALLMENT_SAVINGS, TAX_TYPE } from '../support/constants';
import AccountListItem from '../components/account/AccountListItem';
import PageTemplate from '../components/common/PageTemplate';

const accounts: IAccount[] = [
  {
    id: 1,
    title: '첫 고정적금',
    amount: 40000000,
    currentAmount: 30000,
    startDate: '2019-01-01',
    endDate: '2021-01-01',
    savingType: INSTALLMENT_SAVINGS[0],
    taxType: TAX_TYPE.NORMAL_TAX,
    rate: 0.1
  },
  {
    id: 2,
    title: '두번째 적금',
    amount: 40000000,
    currentAmount: 30000,
    startDate: '2019-02-01',
    endDate: '2022-02-01',
    savingType: INSTALLMENT_SAVINGS[1],
    taxType: TAX_TYPE.NORMAL_TAX,
    rate: 0.2
  },
  {
    id: 3,
    title: '마지막 고정적금',
    amount: 40000000,
    currentAmount: 30000,
    startDate: '2019-02-11',
    endDate: '2024-02-11',
    savingType: INSTALLMENT_SAVINGS[2],
    taxType: TAX_TYPE.NORMAL_TAX,
    rate: 0.3
  }
];

const bucketList: IBucketList[] = [
  {
    title: '버킷리스트 1번 목표',
    percent: 82
  },
  {
    title: '버킷리스트 2번 목표',
    percent: 24
  }
];

function Main() {
  return (
    <PageTemplate isMain>
      <Header />
      <TotalAssetsWallet totalPrice={50000} lastMonthTotalPrice={30000} />
      <MainCardArea title='자산현황'>
        {accounts.map((account, index) => (
          <AccountListItem key={index} account={account} />
        ))}
      </MainCardArea>
      <MainCardArea title='버킷리스트'>
        {bucketList.map((bucket, index) => (
          <BucketListItem key={index} bucketList={bucket} />
        ))}
      </MainCardArea>
      <NavigationBar />
    </PageTemplate>
  );
}

export default Main;
