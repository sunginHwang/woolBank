import React from 'react';
import loadable from '@loadable/component';
import { LayoutRouteProps } from '@routes/Routes';

import PageTemplate from '@components/layout/PageTemplate';

const defaultFallback = { fallback: <PageTemplate useHeader={false} /> };

const user: LayoutRouteProps[] = [{
  path: '/mypage',
  key: 'mypage',
  component: loadable(() => import('@pages/Menu'), {
    fallback: <PageTemplate useHeader useBackButton={false} title='나의 뱅킷리스트' />
  }),
  exact: true,
},{
  path: '/login',
  key: 'loginPage',
  component: loadable(() => import('@pages/user/login'), defaultFallback),
  exact: true,
  useNavBar: false,
  checkAuth: false
}];

export default user;
