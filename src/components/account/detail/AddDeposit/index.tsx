import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import AddButton from '@components/common/AddButton';
import AmountKeyPad from '@components/common/AmountKeyPad';
import useAccountQuery, { useAccountQuerySetter } from '@/services/account/useAccountQuery';
import getRemainDeposit from '@/services/account/getRemainDeposit';

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

  // 예적금 입력 모듈 열기
  const openDepositKeyPad = () => {
    history.push(`/accounts/${accountId}?mode=deposit`);
  };

  // 예적금 입력 모듈 닫기
  const closeDepositKeyPad = () => {
    history.goBack();
  };

  const onAmountChange = async (amount: number) => {
    onAddDeposit({ amount, depositDate: new Date(), remainDepositAmount: getRemainDeposit(account) });
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
          label='입금하실 금액을 입력해주세요.'
          maxAmount={account.amount - account.currentAmount}
          loading={isAddDepositLoading}
          isResetValue={!isOpenKeypad}
          onClose={closeDepositKeyPad}
          onAmountChange={onAmountChange}
        />
      </S.Slide>
    </>
  )
}

export default AddDeposit;

const S: any = {
  Slide: styled.div`
    position: fixed;
    bottom: ${(props: any) => (props.visible ? '0' : '-100%')};
    width: 100%;
    height: 100%;
    transition: all 0.3s ease;
    z-index: ${(props) => props.theme.zIndex.layer};
  `
};
