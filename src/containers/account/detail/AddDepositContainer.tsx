import React, { useEffect, useState } from 'react';
import AddDepositButton from '../../../components/account/detail/AddDepositButton';
import NumberInput from '../../../components/common/NumberInput';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import useRequest from '../../../support/hooks/useRequest';
import { addDeposit } from '../../../support/api/accountApi';
import { useDispatch } from 'react-redux';
import { getAccount } from '../../../store/modules/AccountDetail';

type AddDepositContainerProps = {
  accountId: number;
  useDepositPhase: boolean;
  onBackClick: () => void;
};

function AddDepositContainer({ accountId, useDepositPhase, onBackClick }: AddDepositContainerProps) {
  const [depositAmount, setDepositAmount] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();

  const [onAddDepositRequest, isAddDepositLoading, error] = useRequest(addDeposit);

  const onAddDeposit = async () => {
    await onAddDepositRequest({
      params: {
        accountId,
        amount: depositAmount
      },
      callbackFunc: () => {
        dispatch(getAccount(accountId));
      }
    });

    setDepositAmount(0);
    onBackClick();
  };

  useEffect(() => {
    error && alert(error);
  }, [error]);

  const onOpenDepositKeyPad = () => {
    history.push(`/accounts/${accountId}?mode=deposit`);
  };

  const onCloseDepositKeyPad = () => {
    history.goBack();
  };

  return (
    <>
      <AddDepositButton onClick={onOpenDepositKeyPad} />
      <S.Slide visible={useDepositPhase}>
        <NumberInput
          currentAmount={depositAmount}
          label='입금하실 금액을 입력해주세요.'
          useClose
          loading={isAddDepositLoading}
          isActiveComplete={depositAmount > 0}
          onChangeAmount={setDepositAmount}
          onCompleteClick={onAddDeposit}
          onCloseClick={onCloseDepositKeyPad}
        />
      </S.Slide>
    </>
  );
}

const S: any = {
  Slide: styled.div`
    position: fixed;
    bottom: ${(props: any) => (props.visible ? '0' : '-100%')};
    width: 100%;
    height: 100%;
    transition: all 0.3s ease;
    z-index: ${(props) => props.theme.zIndex.modalDeem + 1};
  `
};

export default AddDepositContainer;
