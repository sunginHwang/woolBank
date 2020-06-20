import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import TotalAssetsWallet from '../components/main/TotalAssetsWallet';
import WalletList from '../components/wallet/WalletList';
import { IWallet } from '../models/IWallet';

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

function Main() {
  const todo = useSelector((state: RootState) => state.todo);
  console.log(todo);
  return (
    <>
      <TotalAssetsWallet totalPrice={50000}/>
      <WalletList wallets={assets}/>
    </>
  );
}


export default Main;
