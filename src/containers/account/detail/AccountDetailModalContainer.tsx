import React from 'react';
import AccountEditModal from '../../../components/account/detail/AccountEditModal';
import DepositDate from '../../../components/account/detail/DepositDate';
import { useHistory } from 'react-router-dom';
import ConfirmModal from '../../../components/common/modal/ConfirmModal';
import { useToggle } from '../../../support/hooks/useToggle';
import useRequest from '../../../support/hooks/useRequest';
import { removeAccount } from '../../../support/api/accountApi';
import { useDispatch } from 'react-redux';
import { getAccountList } from '../../../store/modules/AccountList';
import accountDetailModule from '../../../store/modules/AccountDetail';

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
  const history = useHistory();
  const dispatch = useDispatch();
  const [isOpenEndModal, onEndModal, offEndModal] = useToggle(false);
  const [isOpenDeleteModal, onDeleteModal, offDeleteModal] = useToggle(false);
  const [endDateSettingLoading, onEndDateSettingLoading, offEndDateSettingLoading] = useToggle(false);

  const [onRemoveRequest, isRemoveLoading, removeError] = useRequest(removeAccount);
  // const [onAddDepositRequest, isAddDepositLoading, removeError] = useRequest(addDeposit);

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

  const onSetEndingAccount = () => {
    onEndDateSettingLoading();
    setTimeout(() => {
      offEndDateSettingLoading();
      offEndModal();
    }, 500);
  };

  const onBackClick = () => {
    history.goBack();
  };

  return (
    <>
      <AccountEditModal
        visible={isActiveModal}
        oncloseModal={onCloseModal}
        onEditClick={onEditModalClick}
      />
      <DepositDate isActive={useEditPhase} onBackClick={onBackClick} />
      <ConfirmModal
        visible={isOpenEndModal}
        loading={endDateSettingLoading}
        message='만기처리 진행 후 다시 변경이 불가능 합니다. 정말 만기처리 하시겠습니까?'
        onConfirmClick={onSetEndingAccount}
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
