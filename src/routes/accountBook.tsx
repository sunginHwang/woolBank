import React from 'react';
import loadable from '@loadable/component';
import { LayoutRouteProps } from '@routes/Routes';

import PageTemplate from '@components/layout/PageTemplate';

const accountBook: LayoutRouteProps[] = [
  {
    path: '/account-books',
    key: 'accountBookListPage',
    component: loadable(() => import('@pages/accountBook'), {
      fallback: <PageTemplate title='가계부' useBackButton={false} useSidePadding={false} />
    }),
    exact: true,
  },
  {
    path: '/account-books/save',
    key: 'accountBookRegisterPage',
    component: loadable(() => import('@pages/accountBook/save/SaveAccountBook'), {
      fallback: <PageTemplate title='가계부 등록' />
    }),
    exact: true,
    useNavBar: false
  },
  {
    path: '/account-books/save/regular-expenditure',
    key: 'regularExpenditureRegisterPage',
    component: loadable(() => import('@pages/accountBook/save/SaveRegularExpenditure'), {
      fallback: <PageTemplate title='정기지출 등록' />
    }),
    exact: true,
    useNavBar: false
  }
];

export default accountBook;