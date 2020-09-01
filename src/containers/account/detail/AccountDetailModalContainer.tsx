import React, { useEffect } from 'react';
import AccountEditModal from '../../../components/account/detail/AccountEditModal';
import DepositDate from '../../../components/account/detail/DepositDate';
import { useHistory } from 'react-router-dom';
import ConfirmModal from '../../../components/common/modal/ConfirmModal';
import { useToggle } from '../../../support/hooks/useToggle';
import useRequest from '../../../support/hooks/useRequest';
import { addDeposit, expirationAccount, removeAccount } from '../../../support/api/accountApi';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountList } from '../../../store/modules/AccountList';
import accountDetailModule, { getAccount } from '../../../store/modules/AccountDetail';
import { RootState } from '../../../store';
import { addComma } from '../../../support/util/String';

type AccountDetailModalContainerProps = {
  accountId: number;
  isActiveModal: boolean;
  useEditPhase: boolean;
  onCloseModal: () => void;
};

function AccountDetailModalContainer({
  accountId,
  isActiveModal,
  useEditPhase,
  onCloseModal
}: AccountDetailModalContainerProps) {
  const [isOpenEndModal, onEndModal, offEndModal] = useToggle(false);
  const [isOpenDeleteModal, onDeleteModal, offDeleteModal] = useToggle(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const account = useSelector((state: RootState) => state.AccountDetail.accountDetail.data);
  const [onRemoveRequest, isRemoveLoading, removeError] = useRequest(removeAccount);
  const [onAddDepositRequest, isAddDepositLoading, depositError] = useRequest(addDeposit);
  const [onExpirationRequest, isExpirationLoading, expirationError] = useRequest(expirationAccount);

  // 모달 클릭 이벤트
  const onEditModalClick = (edit: 'migration' | 'end' | 'remove') => {
    onCloseModal();

    if (edit === 'migration') {
      history.push(`/accounts/${accountId}?mode=edit`);
    }

    if (edit === 'end') {
      onEndModal();
    }

    if (edit === 'remove') {
      onDeleteModal();
    }
  };

  const onRemoveAccount = async () => {
    await onRemoveRequest({
      params: [accountId],
      callbackFunc: () => {
        // 삭제 후 리스트 싱크를 위한 조회
        dispatch(getAccountList());
      }
    });

    history.push('/accounts');
    // store 예적금 정보 삭제
    dispatch(accountDetailModule.actions.removeAccountDetail(accountId));
  };

  const onDepositWithDate = async (amount: number, depositDate: Date) => {
    if (!account) {
      return;
    }

    const remainDepositAmount = account.amount - account.currentAmount;

    if (amount > remainDepositAmount) {
      alert(`최대 입금 가능 금액은 ${addComma(remainDepositAmount)} 입니다.`);
      return;
    }

    await onAddDepositRequest({
      params: {
        accountId,
        amount,
        depositDate
      },
      callbackFunc: () => {
        dispatch(getAccount(accountId));
      }
    });
    onBackClick();
  };

  const onExpiration = async () => {
    await onExpirationRequest({
      params: [accountId],
      callbackFunc: () => {
        dispatch(getAccount(accountId));
      }
    });
    offEndModal();
  };

  const onBackClick = () => {
    history.goBack();
  };

  // request 에러 처리
  useEffect(() => {
    depositError && alert(depositError.message);
    removeError && alert(removeError.message);
    expirationError && alert(expirationError.message);
  }, [depositError, removeError, expirationError]);

  return (
    <>
      <AccountEditModal visible={isActiveModal} oncloseModal={onCloseModal} onEditClick={onEditModalClick} />
      <DepositDate
        isActive={useEditPhase}
        isLoading={isAddDepositLoading}
        onBackClick={onBackClick}
        onDepositClick={onDepositWithDate}
      />
      <ConfirmModal
        visible={isOpenEndModal}
        loading={isExpirationLoading}
        message='만기처리 진행 후 다시 변경이 불가능 합니다. 정말 만기처리 하시겠습니까?'
        onConfirmClick={onExpiration}
        onCancelClick={offEndModal}
      />
      <ConfirmModal
        visible={isOpenDeleteModal}
        loading={isRemoveLoading}
        message='한번 삭제 이후 다시 복원이 불가능 합니다. 정말 삭제하시겠습니까?'
        onConfirmClick={onRemoveAccount}
        onCancelClick={offDeleteModal}
      />
    </>
  );
}

export default AccountDetailModalContainer;
