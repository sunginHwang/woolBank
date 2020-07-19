import React, { useState } from 'react';
import AddDepositButton from '../../../components/account/detail/AddDepositButton';
import NumberInput from '../../../components/common/NumberInput';
import styled from 'styled-components';
import { useHistory } from 'react-router';

type AddDepositContainerProps = {
  accountId: number;
  useDepositPhase: boolean;
  onBackClick: () => void;
};

function AddDepositContainer({
  accountId,
  useDepositPhase,
  onBackClick
}: AddDepositContainerProps) {
  const [depositAmount, setDepositAmount] = useState(0);
  const [addDepositLoading, setAddDepositLoading] = useState(false);
  const history = useHistory();

  const createDepositAmount = (
    amount: number,
    depositDate: Date = new Date()
  ) => {
    console.log(`deposit: ${amount}, date: ${depositDate}`);
  };

  const createCurrentDepositAmount = () => {
    setAddDepositLoading(true);
    setTimeout(() => {
      setAddDepositLoading(false);
      createDepositAmount(depositAmount);
      onBackClick();
    }, 500);
  };

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
          loading={addDepositLoading}
          isActiveComplete={depositAmount > 0}
          onChangeAmount={setDepositAmount}
          onCompleteClick={createCurrentDepositAmount}
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
