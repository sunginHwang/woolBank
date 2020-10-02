import React, { useEffect } from 'react';

import AccountListContainer from '@containers/account/list/AccountListContainer';
import PageTemplate from '@components/layout/PageTemplate';

import { useErrorStatus } from '@support/context/ErrorHandler';
function AccountList() {
  const { setErrorStatusCode } = useErrorStatus();

  useEffect(() => {
    setTimeout(() => {
      setErrorStatusCode(404);
    }, 2000);
  }, []);

  return (
    <PageTemplate useHeader={false} useSidePadding={false}>
      <AccountListContainer />
    </PageTemplate>
  );
}

export default AccountList;
