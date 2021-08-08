import React from 'react';
import { useHistory, useParams } from 'react-router';

import PageTemplate from '@components/layout/PageTemplate';
import AccountDetailInfo from '@components/account/detail/AccountDetailInfo';
import AccountBottomMenu from '@components/account/detail/AccountBottomMenu';
import AddDeposit from '@components/account/detail/AddDeposit';
import IcoDowHorizontal from '@components/atoms/icon/IcoDotHorizontal';

import colors from '@style/theme';
import { useQuery } from '@support/hooks/UseQuery';
import { useToggle } from '@support/hooks/useToggle';

/**
 * 예적금 상세 페이지
 * @component
 */

function AccountDetailPage() {
  const [isOpenDetailModal, onDetailModal, offDetailModal] = useToggle(false);

  const history = useHistory();
  const { mode } = useQuery(['mode']);
  const { accountId } = useParams<{ accountId: string }>();

  const goAccountListPage = () => {
    history.push('/accounts');
  };

  const renderEditButtonIcon = (
    <div onClick={onDetailModal}>
      <IcoDowHorizontal fill={colors.colors.blackL1} />
    </div>
  );

  return (
    <PageTemplate
      title='계좌정보'
      useSidePadding={false}
      onBackClick={goAccountListPage}
      rightHeader={renderEditButtonIcon}
    >
      <AccountDetailInfo accountId={Number(accountId)} />
      <AccountBottomMenu
        accountId={Number(accountId)}
        isActiveModal={isOpenDetailModal}
        useEditPhase={mode === 'edit'}
        onCloseModal={offDetailModal}
      />
      <AddDeposit
        accountId={Number(accountId)}
        isOpenKeypad={mode === 'deposit'}
      />
    </PageTemplate>
  );
}

export default AccountDetailPage;
