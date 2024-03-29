import React from 'react';
import loadable from '@loadable/component';
import { LayoutRouteProps } from '@routes/index';

import PageTemplate from '@components/layout/PageTemplate';

const AccountList = loadable(() => import('@pages/account/AccountListPage'), {
  fallback: <PageTemplate title='자산관리' useBackButton={false} useSidePadding={false} />
});
const AccountDetail = loadable(() => import('@pages/account/AccountDetailPage'), {
  fallback: <PageTemplate title='계좌정보' useSidePadding={false} />
});

const AccountRegister = loadable(() => import('@pages/account/AccountRegister'), { fallback: <PageTemplate useHeader={false} /> });

const accounts: LayoutRouteProps[] = [{
  path: '/accounts',
  key: 'accountListPage',
  component: AccountList,
  exact: true
}, {
  path: '/accounts/save',
  key: 'accountRegisterPage',
  component: AccountRegister,
  exact: true
}, {
  path: '/accounts/:accountId',
  key: 'accountDetailPage',
  component: AccountDetail,
  exact: true,
  useNavBar: false
}];

export default accounts;
