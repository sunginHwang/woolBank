import React, { useState } from 'react';
import { IWalletForm } from '../../models/IWalletForm';
import WalletInfoAddPhase from '../../components/wallet/addPhase/WalletInfoAddPhase';
import WalletAmountAddPhase from '../../components/wallet/addPhase/walletAmountAddPhase';
import WalletConfirmPhase from '../../components/wallet/addPhase/WalletConfirmPhase';
import AddRatePhase from '../../components/wallet/addPhase/AddRatePhase';
import { IAssetType } from '../../models/IAssetType';
import { TAX_TYPE } from '../../support/constants';

type WalletAddContainerProps = {
  phase: number;
  onChangePhase: (phase: number) => void;
};

function WalletAddContainer({ phase, onChangePhase }: WalletAddContainerProps) {
  const [walletForm, setWalletForm] = useState<IWalletForm>({
    title: '',
    savingType: { type: '', name: '' },
    startDate: '',
    endDate: '',
    taxType: TAX_TYPE.NORMAL_TAX,
    rate: 0,
    amount: 0
  });

  const onChangeWalletForm = (
    type: string,
    value: string | number | IAssetType
  ) => {
    setWalletForm({
      ...walletForm,
      [type]: value
    });
  };

  const goNextPage = () => onChangePhase(phase + 1);
  const goPrevPage = () => onChangePhase(phase - 1);

  return (
    <>
      <WalletInfoAddPhase
        walletForm={walletForm}
        isActivePhase={phase >= 1}
        onChangeWalletForm={onChangeWalletForm}
        goPrevPhase={goPrevPage}
        goNextPage={goNextPage}
      />
      <WalletAmountAddPhase
        isActivePhase={phase >= 2}
        amount={walletForm.amount}
        onChangeWalletForm={onChangeWalletForm}
        goPrevPhase={goPrevPage}
        goNextPhase={goNextPage}
      />
      <AddRatePhase
        isActivePhase={phase >= 3}
        wallet={walletForm}
        onChangeWalletForm={onChangeWalletForm}
        goNextPhase={goNextPage}
        goPrevPhase={goPrevPage}
      />
      <WalletConfirmPhase
        wallet={walletForm}
        isActivePhase={phase >= 4}
        onComplete={goNextPage}
        goPrevPhase={goPrevPage}
      />
    </>
  );
}

export default WalletAddContainer;
