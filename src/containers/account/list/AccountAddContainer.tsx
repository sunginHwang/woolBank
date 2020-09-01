import React, { useEffect, useState } from 'react';
import AccountInfoPhase from '../../../components/account/list/addPhase/AccountInfoPhase';
import AmountAddPhase from '../../../components/account/list/addPhase/AmountAddPhase';
import ConfirmPhase from '../../../components/account/list/addPhase/ConfirmPhase';
import RateAddPhase from '../../../components/account/list/addPhase/RateAddPhase';
import { IAssetType } from '../../../models/IAssetType';
import { useHistory } from 'react-router';
import useRequest from '../../../support/hooks/useRequest';
import { saveAccount } from '../../../support/api/accountApi';
import { INSTALLMENT_SAVINGS_TAX } from '../../../support/constants';

type AccountAddContainerProps = {
  phase: number;
  goNextPhase: () => void;
  goPrevPhase: () => void;
};

export type IAccountForm = {
  title: string;
  taxType: string;
  regularTransferDate: number;
  rate: number;
  amount: number;
  savingTypeId: number;
  startDate: Date | string;
  endDate: Date | string;
  savingType: IAssetType;
};

const initialAccountInfo: IAccountForm = {
  title: '',
  savingType: { id: 0, type: '', name: '' },
  startDate: '',
  endDate: '',
  taxType: INSTALLMENT_SAVINGS_TAX[0].type,
  regularTransferDate: 0, // 정기이체일 정기적금에만 사용
  rate: 0,
  amount: 0,
  savingTypeId: 0
};

function AccountAddContainer({ phase, goNextPhase, goPrevPhase }: AccountAddContainerProps) {
  const [accountForm, setAccount] = useState<IAccountForm>(initialAccountInfo);

  const [onSaveAccountRequest, saveAccountLoading, saveAccountError] = useRequest(saveAccount);
  const history = useHistory();

  const onChangeAccount = (type: string, value: string | number | Date | IAssetType) => {
    setAccount((prevState) => {
      return {
        ...prevState,
        [type]: value
      };
    });
  };

  const onSaveAccount = async () => {
    // 적금 타입 id 세팅
    const saveAccountReq = Object.assign({}, accountForm);
    saveAccountReq.savingTypeId = saveAccountReq.savingType.id || 0;
    await onSaveAccountRequest({
      params: saveAccountReq,
      callbackFunc: (res: any) => {
        history.push(`/accounts/${res.data.accountId}`)
      }
    });
  };

  useEffect(() => {
    phase < 1 && setAccount(initialAccountInfo); // 예적금 입력 종료시 초기화 처리
  }, [phase]);

  useEffect(() => {
    saveAccountError && alert(saveAccountError);
  }, [saveAccountError]);

  return (
    <>
      <AccountInfoPhase
        accountForm={accountForm}
        isActivePhase={phase >= 1}
        onChangeAccount={onChangeAccount}
        goPrevPhase={goPrevPhase}
        goNextPhase={goNextPhase}
      />
      <AmountAddPhase
        isActivePhase={phase >= 2}
        amount={accountForm.amount}
        onChangeAccount={onChangeAccount}
        goPrevPhase={goPrevPhase}
        goNextPhase={goNextPhase}
      />
      <RateAddPhase
        isActivePhase={phase >= 3}
        accountForm={accountForm}
        onChangeAccount={onChangeAccount}
        goPrevPhase={goPrevPhase}
        goNextPhase={goNextPhase}
      />
      <ConfirmPhase
        accountForm={accountForm}
        isActivePhase={phase >= 4}
        loading={saveAccountLoading}
        onComplete={onSaveAccount}
        goPrevPhase={goPrevPhase}
      />
    </>
  );
}

export default AccountAddContainer;
