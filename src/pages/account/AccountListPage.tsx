import React from 'react';
import { useHistory } from 'react-router';

import AccountSlideViewer from '@components/account/list/AccountSlideViewer';
import PageTemplate from '@components/layout/PageTemplate';
import AddButton from '@components/common/AddButton';

/**
 * 예 적금 리스트 페이지
 * @component
 */

function AccountListPage() {
  const history = useHistory();

  /**
   * 예적금 등록 페이지 이동
   **/
  const goAccountRegisterPage = () => {
    history.push('/accounts/save');
  };

  return (
    <PageTemplate useHeader={false} topPadding={8.8} useSidePadding={false}>
      <AccountSlideViewer />
      <AddButton icon='+' onClick={goAccountRegisterPage} />
    </PageTemplate>
  );
}

export default AccountListPage;
