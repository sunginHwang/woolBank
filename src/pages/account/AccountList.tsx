import React from 'react';

import AccountListContainer from '@containers/account/list/AccountListContainer';
import PageTemplate from '@components/layout/PageTemplate';

function AccountList() {
  return (
    <PageTemplate useHeader={false} useSidePadding={false}>
      <AccountListContainer />
    </PageTemplate>
  );
}

export default AccountList;
