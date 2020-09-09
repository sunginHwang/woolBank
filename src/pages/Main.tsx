import React from 'react';
import TotalAssetsWallet from '../components/main/TotalAssetsWallet';
import MainCardArea from '../components/main/MainCardArea';
import BucketListItem from '../components/bucketList/BucketList/BucketListItem';
import AccountListItem from '../components/account/AccountListItem';
import PageTemplate from '../components/common/PageTemplate';
import MainPlaceHolder from '../components/main/MainPlaceHolder';

import useFetch from '../support/hooks/useFetch';
import { IMainInfo } from '../models/main/IMainInfo';

function Main() {
  const [mainInfo, mainInfoLoading, mainInfoError] = useFetch<IMainInfo>('main');

  if (mainInfoLoading) {
    return (
      <PageTemplate isMain>
        <MainPlaceHolder />
      </PageTemplate>
    );
  }

  if (!mainInfo) {
    return null;
  }

  if (mainInfoError) {
    alert('정보를 불러오지 못했습니다.');
    return null;
  }

  return (
    <PageTemplate isMain>
      <TotalAssetsWallet totalPrice={mainInfo.amount} lastMonthTotalPrice={30000} />
      <MainCardArea title='자산현황'>
        {mainInfo.accounts.map((account, index) => (
          <AccountListItem key={index} account={account} />
        ))}
      </MainCardArea>
      <MainCardArea title='버킷리스트'>
        {mainInfo.bucketList.map((bucket, index) => (
          <BucketListItem key={index} bucketList={bucket} />
        ))}
      </MainCardArea>
    </PageTemplate>
  );
}

export default Main;
