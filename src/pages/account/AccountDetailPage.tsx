import React from 'react';
import { useHistory, useParams } from 'react-router';

import PageTemplate from '@components/layout/PageTemplate';
import AddDepositContainer from '@containers/account/detail/AddDepositContainer';
import AccountDetailInfo from '@components/account/detail/AccountDetailInfo';
import AccountBottomMenu from '@components/account/detail/AccountBottomMenu';
import IcoDowHorizontal from '@components/icon/IcoDotHorizontal';

import colors from '@style/theme';
import { useQuery } from '@support/hooks/UseQuery';
import { useToggle } from '@support/hooks/useToggle';

function AccountDetailPage() {
  const [isOpenDetailModal, onDetailModal, offDetailModal] = useToggle(false);

  const history = useHistory();
  const { mode } = useQuery(['mode']);
  const { accountId } = useParams<{ accountId: string }>();

  /**
   * 뒤로가기 버튼 클릭
   **/
  const onBackClick = () => {
    history.goBack();
  };

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
      <AddDepositContainer
        accountId={Number(accountId)}
        onBackClick={onBackClick}
        useDepositPhase={mode === 'deposit'}
      />
      <AccountBottomMenu
        accountId={Number(accountId)}
        isActiveModal={isOpenDetailModal}
        useEditPhase={mode === 'edit'}
        onCloseModal={offDetailModal}
      />
    </PageTemplate>
  );
}

export default AccountDetailPage;
