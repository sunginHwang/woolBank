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

export type IAccountForm = {
  title: string;
  taxType: string;
  regularTransferDate: number;
  rate: number;
  amount: number;
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
  amount: 0
};

const MAX_PHASE = 4;

function AccountAddContainer() {
  const [accountForm, setAccount] = useState<IAccountForm>(initialAccountInfo);
  const [phase, setPhase] = useState(1);
  const [onSaveAccountRequest, saveAccountLoading, saveAccountError] = useRequest(saveAccount);
  const history = useHistory();

  const goNextPhase = () => {
    // 최대 4phase 까지만
    if (phase < MAX_PHASE) {
      setPhase((phase) => phase + 1);
    }
  };
  const goPrevPhase = () => {
    if (phase > 1) {
      setPhase((phase) => phase - 1);
    }
  };

  const onChangeAccount = (type: string, value: string | number | Date | IAssetType) => {
    setAccount((prevState) => {
      return {
        ...prevState,
        [type]: value
      };
    });
  };

  const onSaveAccount = async () => {
    await onSaveAccountRequest({
      params: accountForm,
      callbackFunc: (res: any) => {
        history.push(`/accounts/${res.data.accountId}`);
      }
    });
  };

  // todo 사용자 브라우저 뒤로가기 클릭시 초기화 안되는 부분 수정 필요
  const onCloseClick = () => {
    setAccount(initialAccountInfo); // 예적금 입력 종료시 초기화 처리
    history.goBack();
  };

  useEffect(() => {
    saveAccountError && alert(saveAccountError);
  }, [saveAccountError]);

  return (
    <>
      <AccountInfoPhase
        accountForm={accountForm}
        isActivePhase={phase >= 1}
        onChangeAccount={onChangeAccount}
        goPrevPhase={onCloseClick}
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
