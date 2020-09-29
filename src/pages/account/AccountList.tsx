import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

import AccountListContainer from '@containers/account/list/AccountListContainer';
import PageTemplate from '@components/layout/PageTemplate';

function AccountList() {
  const history = useHistory();

/*  useEffect(() => {
    setTimeout(() => {
      history.replace(history.location.pathname, { errorStatusCode: 404 });
    }, 2000);
  }, []);*/

  return (
    <PageTemplate useHeader={false} useSidePadding={false}>
      <AccountListContainer />
    </PageTemplate>
  );
}

export default AccountList;
