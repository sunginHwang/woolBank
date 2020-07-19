import React from 'react';
import AccountEditModal from '../../../components/account/detail/AccountEditModal';
import DepositDate from '../../../components/account/detail/DepositDate';
import { useHistory } from 'react-router-dom';
import ConfirmModal from '../../../components/common/modal/ConfirmModal';
import { useToggle } from '../../../support/hooks/useToggle';

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
  const [isOpenEndModal, onEndModal, offEndModal] = useToggle(false);
  const [isOpenDeleteModal, onDeleteModal, offDeleteModal] = useToggle(false);
  const [endDateSettingLoading, onEndDateSettingLoading, offEndDateSettingLoading] = useToggle(false);
  const [removeLoading, onRemoveLoading, offRemoveLoading] = useToggle(false);

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

  const onRemoveAccount = () => {
    onRemoveLoading();
    setTimeout(() => {
      offRemoveLoading();
      offDeleteModal();
    }, 500);
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
        loading={removeLoading}
        message='한번 삭제 이후 다시 복원이 불가능 합니다. 정말 삭제하시겠습니까?'
        onConfirmClick={onRemoveAccount}
        onCancelClick={offDeleteModal}
      />
    </>
  );
}

export default AccountDetailModalContainer;
