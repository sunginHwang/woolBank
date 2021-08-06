import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import AddButton from '@components/common/AddButton';
import AmountKeyPad from '@components/common/AmountKeyPad';
import useAccountQuery, { useAccountQuerySetter } from '@/services/account/useAccountQuery';
import getRemainDeposit from '@/services/account/getRemainDeposit';
import { delay } from '@support/util/delay';

interface IProps {
  isOpenKeypad: boolean;
  accountId: number;
}

/**
 * 예적금 상세페이지 - 예금 입력
 * @component
 */

function AddDeposit(props: IProps) {
  const { isOpenKeypad, accountId } = props;
  const history = useHistory();
  const { account } = useAccountQuery(accountId);
  const { onAddDeposit, isAddDepositLoading } = useAccountQuerySetter(accountId);

  const [depositAmount, setDepositAmount] = useState(0);

  // 예적금 입력 모듈 열기
  const openDepositKeyPad = () => {
    history.push(`/accounts/${accountId}?mode=deposit`);
  };

  // 예적금 입력 모듈 닫기
  const closeDepositKeyPad = () => {
    setDepositAmount(0);
    history.goBack();
  };

  const onCompleteClick = async () => {
    onAddDeposit({ amount: depositAmount, depositDate: new Date(), remainDepositAmount: getRemainDeposit(account) });
    // 키패드 내려간 후 초기화 (UX)
    await delay(100);
    setDepositAmount(0);
  }

  const isShowDepositButton = account.currentAmount < account.amount && !account.isExpiration && account.savingType.type === 'freeInstallmentSavings';

  if (!isShowDepositButton) {
    return null;
  }

  return (
    <>
      <AddButton icon='+' onClick={openDepositKeyPad} />
      <S.Slide visible={isOpenKeypad}>
        <AmountKeyPad
          useClose
          currentAmount={depositAmount}
          label='입금하실 금액을 입력해주세요.'
          isActiveComplete={depositAmount > 0}
          loading={isAddDepositLoading}
          onChangeAmount={setDepositAmount}
          onClose={closeDepositKeyPad}
          onCompleteClick={onCompleteClick}
        />
      </S.Slide>
    </>
  )
}

export default AddDeposit;

const S = {
  Slide: styled.div`
    position: fixed;
    bottom: ${(props: any) => (props.visible ? '0' : '-100%')};
    width: 100%;
    height: 100%;
    transition: all 0.3s ease;
    z-index: ${(props) => props.theme.zIndex.modalDeem + 1};
  `
};
