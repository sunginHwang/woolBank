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
import { IAccountForm } from '../../../models/IAccountForm';
import { useToast } from '../../../support/hooks/useToast';

const INIT_ACCOUNT_FORM: IAccountForm = {
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
  const [accountForm, setAccount] = useState<IAccountForm>(INIT_ACCOUNT_FORM);

  const [phase, setPhase] = useState(1);
  const [onSaveAccountRequest, saveAccountLoading] = useRequest(saveAccount);
  const onToast = useToast();
  const history = useHistory();

  /**
   * 예적금 저장
   **/
  const onSaveAccount = async () => {
    let savedAccountId = 0;

    await onSaveAccountRequest({
      params: accountForm,
      onSuccess: (res: any) => {
        savedAccountId = res.data.accountId;
      },
      onError: () => {
        onToast('생성에 실패하였습니다.');
      }
    });

    // history Callback 문제로 별도 처리
    if (savedAccountId > 0) {
      onToast('생성되었습니다.');
      history.push(`/accounts/${savedAccountId}`);
    }
  };

  /**
   * 다음 페이즈 이동
   * */
  const goNextPhase = () => {
    // 최대 4phase 까지만
    if (phase < MAX_PHASE) {
      setPhase((phase) => phase + 1);
    }
  };

  /**
   * 이전 페이즈 이동
   * */
  const goPrevPhase = () => {
    if (phase > 1) {
      setPhase((phase) => phase - 1);
    }
  };

  /**
   * 예적금 From 정보 변경
   * */
  const onChangeAccount = (type: string, value: string | number | Date | IAssetType) => {
    setAccount((prevState) => {
      return {
        ...prevState,
        [type]: value
      };
    });
  };

  /**
   * 뒤로가기 버튼
   * todo 사용자 브라우저 뒤로가기 클릭시 초기화 안되는 부분 수정 필요
   **/
  const onCloseClick = () => {
    history.goBack();
  };

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
