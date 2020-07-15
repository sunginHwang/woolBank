import React, { useState } from 'react';
import AccountEditModal from '../../../components/account/detail/AccountEditModal';
import DepositDate from '../../../components/account/detail/DepositDate';
import { useHistory } from 'react-router-dom';

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

  // 모달 클릭 이벤트
  const onEditModalClick = (edit: 'migration' | 'end' | 'remove') => {
    if (edit === 'migration') {
      onCloseModal();
      history.push(`/accounts/${accountId}?mode=edit`);
    }

    if (edit === 'end') {
    }

    if (edit === 'remove') {
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
    </>
  );
}

export default AccountDetailModalContainer;
