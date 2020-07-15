import React, { useState } from 'react';
import { IAccount } from '../../../models/IAccount';
import AccountInfoPhase from '../../../components/account/list/addPhase/AccountInfoPhase';
import AmountAddPhase from '../../../components/account/list/addPhase/AmountAddPhase';
import ConfirmPhase from '../../../components/account/list/addPhase/ConfirmPhase';
import RateAddPhase from '../../../components/account/list/addPhase/RateAddPhase';
import { IAssetType } from '../../../models/IAssetType';

type AccountAddContainerProps = {
  phase: number;
  goNextPhase: () => void;
  goPrevPhase: () => void;
};

function AccountAddContainer({
  phase,
  goNextPhase,
  goPrevPhase
}: AccountAddContainerProps) {
  const [account, setAccount] = useState<IAccount>({
    title: '',
    savingType: { type: '', name: '' },
    startDate: '',
    endDate: '',
    taxType: '',
    regularTransferDate: 0, // 정기이체일 정기적금에만 사용
    rate: 0,
    amount: 0
  });

  const onChangeAccount = (
    type: string,
    value: string | number | IAssetType
  ) => {
    setAccount((prevState) => {
      return {
        ...prevState,
        [type]: value
      };
    });
  };

  return (
    <>
      <AccountInfoPhase
        account={account}
        isActivePhase={phase >= 1}
        onChangeAccount={onChangeAccount}
        goPrevPhase={goPrevPhase}
        goNextPage={goNextPhase}
      />
      <AmountAddPhase
        isActivePhase={phase >= 2}
        amount={account.amount}
        onChangeAccount={onChangeAccount}
        goPrevPhase={goPrevPhase}
        goNextPhase={goNextPhase}
      />
      <RateAddPhase
        isActivePhase={phase >= 3}
        account={account}
        onChangeAccount={onChangeAccount}
        goPrevPhase={goPrevPhase}
        goNextPhase={goNextPhase}
      />
      <ConfirmPhase
        account={account}
        isActivePhase={phase >= 4}
        onComplete={goNextPhase}
        goPrevPhase={goPrevPhase}
      />
    </>
  );
}

export default AccountAddContainer;
