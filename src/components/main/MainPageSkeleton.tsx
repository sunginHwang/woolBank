import React from 'react';

import MainCardArea from '@components/main/MainCardArea';
import TotalAssetsWallet from '@components/main/TotalAssetsWallet';
import AccountListItemPlaceHolder from '@components/account/list/AccountListItemSkeleton';
import BucketListItemPlaceHolder from '@components/bucketList/list/BucketListItemSkeleton';
import PageTemplate from '@components/layout/PageTemplate';

function MainPageSkeleton() {
  return (
    <PageTemplate isMain>
      <TotalAssetsWallet totalPrice={0} lastMonthTotalPrice={0} />
      <MainCardArea title='자산현황'>
        {[...Array(3)].map((_, key) => (
          <AccountListItemPlaceHolder key={key} />
        ))}
      </MainCardArea>
      <MainCardArea title='버킷리스트'>
        {[...Array(3)].map((_, key) => (
          <BucketListItemPlaceHolder key={key} />
        ))}
      </MainCardArea>
    </PageTemplate>
  );
}

export default MainPageSkeleton;
