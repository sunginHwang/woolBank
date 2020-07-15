import React, { useState } from 'react';
import { IAccount } from '../../../models/IAccount';
import AccountInfoPhase from '../../../components/account/addPhase/AccountInfoPhase';
import AmountAddPhase from '../../../components/account/addPhase/AmountAddPhase';
import ConfirmPhase from '../../../components/account/addPhase/ConfirmPhase';
import RateAddPhase from '../../../components/account/addPhase/RateAddPhase';
import { IAssetType } from '../../../models/IAssetType';

type AccountAddContainerProps = {
  phase: number;
  onChangePhase: (phase: number) => void;
};

function AccountAddContainer({ phase, onChangePhase }: AccountAddContainerProps) {
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

  const goNextPage = () => onChangePhase(phase + 1);
  const goPrevPage = () => onChangePhase(phase - 1);

  return (
    <>
      <AccountInfoPhase
        account={account}
        isActivePhase={phase >= 1}
        onChangeAccount={onChangeAccount}
        goPrevPhase={goPrevPage}
        goNextPage={goNextPage}
      />
      <AmountAddPhase
        isActivePhase={phase >= 2}
        amount={account.amount}
        onChangeAccount={onChangeAccount}
        goPrevPhase={goPrevPage}
        goNextPhase={goNextPage}
      />
      <RateAddPhase
        isActivePhase={phase >= 3}
        account={account}
        onChangeAccount={onChangeAccount}
        goNextPhase={goNextPage}
        goPrevPhase={goPrevPage}
      />
      <ConfirmPhase
        account={account}
        isActivePhase={phase >= 4}
        onComplete={goNextPage}
        goPrevPhase={goPrevPage}
      />
    </>
  );
}

export default AccountAddContainer;
