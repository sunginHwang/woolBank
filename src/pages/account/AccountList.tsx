import React from 'react';

import AccountListContainer from '@containers/account/list/AccountListContainer';
import PageTemplate from '@components/layout/PageTemplate';

function AccountList() {
  return (
    <PageTemplate useHeader={false} topPadding={8.8} useSidePadding={false}>
      <AccountListContainer />
    </PageTemplate>
  );
}

export default AccountList;
