import React, { useState } from 'react';
import AddDepositButton from '../../../components/account/detail/AddDepositButton';
import NumberInput from '../../../components/common/NumberInput';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import useRequest from '../../../support/hooks/useRequest';
import { addDeposit } from '../../../support/api/accountApi';
import { useDispatch, useSelector } from 'react-redux';
import { getAccount } from '../../../store/modules/AccountDetail';
import { addComma } from '../../../support/util/String';
import { RootState } from '../../../store';
import { useToast } from '../../../support/hooks/useToast';

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

    if (depositAmount > remainDepositAmount) {
      alert(`최대 입금 가능 금액은 ${addComma(remainDepositAmount)} 입니다.`);
      return;
    }

    await onAddDepositRequest({
      params: {
        accountId,
        amount: depositAmount
      },
      onSuccess: () => {
        dispatch(getAccount(accountId));
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
