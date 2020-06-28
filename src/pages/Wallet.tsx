import React, { useState } from 'react';
import WalletInfoAddPhase from '../components/wallet/addPhase/WalletInfoAddPhase';
import { IAssetType } from '../models/IAssetType';
import { IWalletForm } from '../models/IWalletForm';
import WalletAmountAddPhase from '../components/wallet/addPhase/walletAmountAddPhase';
import WalletConfirmPhase from '../components/wallet/addPhase/WalletConfirmPhase';

const assetTypes: IAssetType[] = [
  {
    type: '1',
    name: '정기적금'
  },
  {
    type: '1',
    name: '정기예금'
  },
  {
    type: '1',
    name: '자유적금'
  }
];

function Wallet() {
  const [phase, setPhase] = useState(1);
  const [walletForm, setWalletForm] = useState<IWalletForm>({
    title: '',
    type: '',
    date: '',
    amount: 0
  });

  const onChangeWalletForm = (type: string, value: string | number) => {
    setWalletForm({
      ...walletForm,
      [type]: value
    });
  };


  const goNextPage = () => setPhase(phase + 1);
  const goPrevPage = () => setPhase(phase - 1);

  return (
    <>
      <WalletInfoAddPhase walletForm={walletForm}
                          assetTypes={assetTypes}
                          isActivePhase={phase >= 1}
                          onChangeWalletForm={onChangeWalletForm}
                          goNextPage={goNextPage}/>
      <WalletAmountAddPhase isActivePhase={phase >= 2}
                            amount={walletForm.amount}
                            onChangeWalletForm={onChangeWalletForm}
                            goPrevPhase={goPrevPage}
                            goNextPhase={goNextPage}/>
      <WalletConfirmPhase wallet={walletForm}
                          isActivePhase={phase >= 3}
                          onComplete={goNextPage}
                          goPrevPhase={goPrevPage}/>
    </>
  );
}


export default Wallet;
