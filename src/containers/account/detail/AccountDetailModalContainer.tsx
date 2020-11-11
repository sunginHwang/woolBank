import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AccountEditModal from '@components/account/detail/AccountEditModal';
import DepositDate from '@components/account/detail/DepositDate';
import ConfirmModal from '@components/common/modal/ConfirmModal';

import { RootState } from '@/store';
import { getAccountList } from '@store/modules/AccountList';
import accountDetailModule, { getAccount } from '@store/modules/AccountDetail';
import { useToggle } from '@support/hooks/useToggle';
import useRequest from '@support/hooks/useRequest';
import { addComma } from '@support/util/String';
import { useToast } from '@support/hooks/useToast';
import { useAlert } from '@support/hooks/useAlert';
import { addDeposit, expirationAccount, removeAccount } from '@support/api/accountApi';

export interface AccountDetailModalContainerProps {
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

  const onToast = useToast();
  const [onAlert] = useAlert();
  const [onRemoveRequest, isRemoveLoading] = useRequest(removeAccount);
  const [onAddDepositRequest, isAddDepositLoading] = useRequest(addDeposit);
  const [onExpirationRequest, isExpirationLoading] = useRequest(expirationAccount);

  /**
   * 예적금 삭제
   **/
  const onRemoveAccount = async () => {
    await onRemoveRequest({
      params: [accountId],
      onSuccess: () => {
        // 삭제 후 리스트 싱크를 위한 조회
        dispatch(getAccountList());
        // 캐시 내역 삭제
        dispatch(accountDetailModule.actions.removeAccountDetail(accountId));
        onToast('삭제되었습니다.');
      },
      onError: () => {
        onToast('삭제 실패');
      }
    });

    history.push('/accounts');
  };

  /**
   * 해당 지정일에 입금하기 (이전 입금기록 추가)
   **/
  const onDepositWithDate = async (amount: number, depositDate: Date) => {
    if (!account) {
      return;
    }

    const remainDepositAmount = account.amount - account.currentAmount;

    if (amount > remainDepositAmount) {
      onAlert(`최대 입금 가능 금액은 ${addComma(remainDepositAmount)} 입니다.`);
      return;
    }

    await onAddDepositRequest({
      params: {
        accountId,
        amount,
        depositDate
      },
      onSuccess: () => {
        dispatch(getAccount(accountId));
        onToast('입금이 완료되었습니다.');
      },
      onError: () => {
        onToast('입금 실패');
      }
    });

    onBackClick();
  };

  /**
   * 예적금 만기처리
   **/
  const onExpiration = async () => {
    await onExpirationRequest({
      params: [accountId],
      onSuccess: () => {
        dispatch(getAccount(accountId));
        onToast('만기처리가 완료되었습니다.');
      },
      onError: () => {
        onToast('만기처리 실패');
      }
    });
    offEndModal();
  };

  /**
   * 우측 옵션 버튼 클릭
   **/
  const onEditModalClick = (edit: 'migration' | 'end' | 'remove') => {
    onCloseModal();

    switch (edit) {
      case 'end': {
        onEndModal();
        break;
      }
      case 'migration': {
        history.push(`/accounts/${accountId}?mode=edit`);
        break;
      }
      case 'remove': {
        onDeleteModal();
        break;
      }
    }
  };

  /**
   * 뒤로가기 버튼
   **/
  const onBackClick = () => {
    history.goBack();
  };

  const isAccountExpiration = account ? account.isExpiration : false;
  const isRegularDeposit = account ? account.savingType.type === 'regularDeposit' : false;

  return (
    <>
      <AccountEditModal
        visible={isActiveModal}
        isAccountExpiration={isAccountExpiration}
        isRegularDeposit={isRegularDeposit}
        oncloseModal={onCloseModal}
        onEditClick={onEditModalClick}
      />
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
