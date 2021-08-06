import React from 'react';
import { useHistory } from 'react-router-dom';

import AddPrevDeposit from '@components/account/detail/AddPrevDeposit';
import BottomMenuModal from '@components/common/modal/BottomMenuModal';
import useAccountQuery, { useAccountQuerySetter } from '@/services/account/useAccountQuery';
import getRemainDeposit from '@/services/account/getRemainDeposit';
import { IBottomMenu } from '@models/component/IBottomMenu';
import options from './options';

const { bottomMenu } = options;

interface IProps {
  accountId: number;
  isActiveModal: boolean;
  useEditPhase: boolean;
  onCloseModal: () => void;
}

/**
 * 예적금 하단 메뉴 구성
 * @component
 */

function AccountBottomMenu({
  accountId,
  isActiveModal,
  useEditPhase,
  onCloseModal
}: IProps) {
  const history = useHistory();
  const { account } = useAccountQuery(accountId);
  const { onRemove, onExpiration, onAddDeposit, isAddDepositLoading } = useAccountQuerySetter(accountId);

  // 우측 옵션 버튼 클릭
  const onEditModalClick = (edit: string) => {
    onCloseModal();

    edit === 'expiration' && onExpiration();
    edit === 'migration' && history.push(`/accounts/${accountId}?mode=edit`);
    edit === 'remove' && onRemove();
  };

  // 뒤로가기 버튼
  const onBackClick = () => {
    history.goBack();
  };

  const isAccountExpiration = account ? account.isExpiration : false;
  const isRegularDeposit = account.savingType.type === 'regularDeposit';
  const remainDepositAmount = getRemainDeposit(account);

  const bottomMenus = getModalMenus(!account.isExpiration && !isRegularDeposit, !isAccountExpiration);

  return (
    <>
      <BottomMenuModal
        menus={bottomMenus}
        title='메뉴를 선택해 주세요.'
        visible={isActiveModal}
        oncloseModal={onCloseModal}
        onEditClick={onEditModalClick}
      />
      <AddPrevDeposit
        isActive={useEditPhase}
        isLoading={isAddDepositLoading}
        remainDepositAmount={remainDepositAmount}
        onBackClick={onBackClick}
        onAddDeposit={onAddDeposit}
      />
    </>
  );
}

function getModalMenus(showMigration: boolean, showExpiration: boolean) {
  let result: IBottomMenu[] = [bottomMenu.remove];

  if (showExpiration) {
    result = [...result, bottomMenu.expiration];
  }

  if (showMigration) {
    result = [...result, bottomMenu.migration];
  }

  return result;
}

export default AccountBottomMenu;
