import React from 'react';
import MainCardArea from './MainCardArea';
import TotalAssetsWallet from './TotalAssetsWallet';
import AccountListItemPlaceHolder from '../account/list/AccountListItemSkeleton';
import BucketListItemPlaceHolder from '../bucketList/BucketList/BucketListItemSkeleton';

function MainPlaceHolder() {
  return (
    <>
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
    </>
  );
}

export default MainPlaceHolder;
