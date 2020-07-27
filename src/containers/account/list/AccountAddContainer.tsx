import React, { useEffect, useState } from 'react';
import { IAccount } from '../../../models/IAccount';
import AccountInfoPhase from '../../../components/account/list/addPhase/AccountInfoPhase';
import AmountAddPhase from '../../../components/account/list/addPhase/AmountAddPhase';
import ConfirmPhase from '../../../components/account/list/addPhase/ConfirmPhase';
import RateAddPhase from '../../../components/account/list/addPhase/RateAddPhase';
import { IAssetType } from '../../../models/IAssetType';
import { useHistory } from 'react-router';

type AccountAddContainerProps = {
  phase: number;
  goNextPhase: () => void;
  goPrevPhase: () => void;
};

const initialAccountInfo: IAccount = {
  title: '',
  savingType: { type: '', name: '' },
  startDate: '',
  endDate: '',
  taxType: '',
  regularTransferDate: 0, // 정기이체일 정기적금에만 사용
  rate: 0,
  amount: 0
};

function AccountAddContainer({
  phase,
  goNextPhase,
  goPrevPhase
}: AccountAddContainerProps) {
  const [account, setAccount] = useState<IAccount>(initialAccountInfo);
  const [accountLoading, setAccountLoading] = useState(false);
  const history = useHistory();

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

  const onSaveAccount = () => {
    setAccountLoading(true);
    setTimeout(() => {
      setAccountLoading(false);
      history.push('/accounts');
    }, 500);
  }

  useEffect(() => {
    phase < 1 && setAccount(initialAccountInfo); // 예적금 입력 종료시 초기화 처리
  }, [phase])

  return (
    <>
      <AccountInfoPhase
        account={account}
        isActivePhase={phase >= 1}
        onChangeAccount={onChangeAccount}
        goPrevPhase={goPrevPhase}
        goNextPhase={goNextPhase}
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
        loading={accountLoading}
        onComplete={onSaveAccount}
        goPrevPhase={goPrevPhase}
      />
    </>
  );
}

export default AccountAddContainer;
