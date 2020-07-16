import React, { useState } from 'react';
import AccountEditModal from '../../../components/account/detail/AccountEditModal';
import DepositDate from '../../../components/account/detail/DepositDate';
import { useHistory } from 'react-router-dom';
import ConfirmModal from '../../../components/common/modal/ConfirmModal';

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
  const [useEndModal, setUseEndModal] = useState(false);
  const [useDeleteModal, setUseDeleteModal] = useState(false);

  // 모달 클릭 이벤트
  const onEditModalClick = (edit: 'migration' | 'end' | 'remove') => {
    onCloseModal();

    if (edit === 'migration') {
      history.push(`/accounts/${accountId}?mode=edit`);
    }

    if (edit === 'end') {
      setUseEndModal(true);
    }

    if (edit === 'remove') {
      setUseDeleteModal(true);
    }
  };

  return (
    <>
      <AccountEditModal
        visible={isActiveModal}
        oncloseModal={onCloseModal}
        onEditClick={onEditModalClick}
      />
      <DepositDate
        isActive={useEditPhase}
        onBackClick={() => history.goBack()}
      />
      <ConfirmModal
        visible={useEndModal}
        message='만기처리 진행 후 다시 변경이 불가능 합니다. 정말 만기처리 하시겠습니까?'
        onConfirmClick={() => setUseEndModal(false)}
        onCancelClick={() => setUseEndModal(false)}
      />
      <ConfirmModal
        visible={useDeleteModal}
        message='한번 삭제 이후 다시 복원이 불가능 합니다. 정말 삭제하시겠습니까?'
        onConfirmClick={() => setUseDeleteModal(false)}
        onCancelClick={() => setUseDeleteModal(false)}
      />
    </>
  );
}

export default AccountDetailModalContainer;
