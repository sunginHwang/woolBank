import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import AddDepositButton from '@components/account/detail/AddDepositButton';
import NumberInput from '@components/common/NumberInput';

import { RootState } from '@/store';
import { getAccount } from '@store/modules/AccountDetail';
import useRequest from '@support/hooks/useRequest';
import { addDeposit } from '@support/api/accountApi';
import { useToast } from '@support/hooks/useToast';

type AddDepositContainerProps = {
  accountId: number;
  useDepositPhase: boolean;
  onBackClick: () => void;
};

function AddDepositContainer({ accountId, useDepositPhase, onBackClick }: AddDepositContainerProps) {
  const [depositAmount, setDepositAmount] = useState(0);

  const account = useSelector((state: RootState) => state.AccountDetail.accountDetail.data);
  const [onAddDepositRequest, isAddDepositLoading] = useRequest(addDeposit);
  const dispatch = useDispatch();
  const history = useHistory();
  const onToast = useToast();

  /**
   * 예금 입력
   **/
  const onAddDeposit = async () => {
    if (!account) {
      return;
    }
    const remainDepositAmount = account.amount - account.currentAmount;

    // 입금액이 남은 잔금보다 많을 수 없음.
    if (depositAmount > remainDepositAmount) {
      return;
    }

    await onAddDepositRequest({
      params: {
        accountId,
        amount: depositAmount
      },
      onSuccess: () => {
        dispatch(getAccount({ accountId, useDelay: false }));
        onToast('입금이 완료되었습니다.');
      },
      onError: () => {
        onToast('입금 실패');
      }
    });

    setDepositAmount(0);
    onBackClick();
  };

  /**
   * 예적금 입력 모듈 열기
   **/
  const onOpenDepositKeyPad = () => {
    history.push(`/accounts/${accountId}?mode=deposit`);
  };

  /**
   * 예적금 입력 모듈 닫기
   **/
  const onCloseDepositKeyPad = () => {
    setDepositAmount(0);
    history.goBack();
  };

  if (!account) {
    return null;
  }
  // 버튼 숨겨야 하는경우 (돈 다 모았을시, 만기처리 하였을 시, 자유적금 타입이 아닐시)
  const isHideDepositButton = account.currentAmount >= account.amount || account.isExpiration || account.savingType.type !== 'freeInstallmentSavings';

  if (isHideDepositButton) {
    return null;
  }

  return (
    <>
      <AddDepositButton onClick={onOpenDepositKeyPad} />
      <S.Slide visible={useDepositPhase}>
        <NumberInput
          useClose
          maxAmount={account.amount - account.currentAmount}
          currentAmount={depositAmount}
          label='입금하실 금액을 입력해주세요.'
          loading={isAddDepositLoading}
          isActiveComplete={depositAmount > 0}
          onChangeAmount={setDepositAmount}
          onCompleteClick={onAddDeposit}
          onClose={onCloseDepositKeyPad}
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
