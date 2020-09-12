import React from 'react';
import AccountListContainer from '../../containers/account/list/AccountListContainer';
import { useHistory } from 'react-router';
import IcoCashPlus from '../../components/icon/IcoCashPlus';
import colors from '../../style/colors';
import PageTemplate from '../../components/common/PageTemplate';

function AccountList() {
  return (
    <PageTemplate useHeader={false}>
      <AccountListContainer />
    </PageTemplate>
  );
}

export default AccountList;
