import React from 'react';
import loadable from '@loadable/component';
import { LayoutRouteProps } from '@routes/index';

import PageTemplate from '@components/layout/PageTemplate';

const defaultFallback = { fallback: <PageTemplate useHeader={false} /> };

const bucketList: LayoutRouteProps[] = [{
  path: '/bucket-list',
  key: 'bucketListPage',
  component: loadable(() => import('@pages/bucketList/BucketListPage'), defaultFallback),
  exact: true
}, {
  path: '/bucket-list/save',
  key: 'bucketListRegisterPage',
  component: loadable(() => import('@pages/bucketList/BucketListSave'), defaultFallback),
  exact: true
}, {
  path: '/bucket-list/:bucketListId',
  key: 'bucketListDetailPage',
  component: loadable(() => import('@pages/bucketList/BucketListDetail'), defaultFallback),
  useNavBar: false
}];

export default bucketList;
