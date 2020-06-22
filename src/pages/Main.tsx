import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import TotalAssetsWallet from '../components/main/TotalAssetsWallet';
import { IWallet } from '../models/IWallet';
import MainCardArea from '../components/main/MainCardArea';
import WalletListItem from '../components/wallet/WalletListItem';
import BucketListItem from '../components/bucketList/BucketList/BucketListItem';
import { IBucketList } from '../models/IBucketList';
import Header from '../components/layout/Header';
import NavigationBar from '../components/layout/NavigationBar';

const assets = [{
  title: '첫 고정적금',
  asset: 30000,
  maturityPrice: 300000,
  type: '고정적금',
  endAt: '2022-02-24'
}, {
  title: '첫 자유적금',
  asset: 3000000,
  maturityPrice: 5000000,
  type: '자유적금',
  endAt: '2021-03-24'
}] as IWallet[];

const bucketList = [{
  title: '버킷리스트 1번 목표',
  percent: 82
}, {
  title: '버킷리스트 2번 목표',
  percent: 24
}] as IBucketList[];

function Main() {
  const todo = useSelector((state: RootState) => state.todo);
  console.log(todo);
  return (
    <>
      <Header/>
      <TotalAssetsWallet totalPrice={50000} lastMonthTotalPrice={30000}/>
      <MainCardArea title='자산현황'>
        {
          assets.map((wallet, index) => <WalletListItem key={index} wallet={wallet}/>)
        }
      </MainCardArea>
      <MainCardArea title='버킷리스트'>
        {
          bucketList.map((bucket, index) => <BucketListItem key={index} bucketList={bucket}/>)
        }
      </MainCardArea>
      <NavigationBar activeNavBar='home'/>
    </>
  );
}


export default Main;
