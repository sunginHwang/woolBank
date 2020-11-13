import React, { useState } from 'react';

import BucketListItem from '@components/bucketList/list/BucketListItem';
import AccountListItem from '@components/account/AccountListItem';
import PageTemplate from '@components/layout/PageTemplate';
import MainPageSkeleton from '@components/main/MainPageSkeleton';
import TotalSavedAmount from '@components/main/TotalSavedAmount';
import AmountChart from '@components/main/AmountChart';
import ToggleTab from '@components/common/ToggleTab';

import { useAlert } from '@support/hooks/useAlert';
import useFetch from '@support/hooks/useFetch';
import { IMainInfo } from '@models/main/IMainInfo';
import { IAssetType } from '@models/IAssetType';

const MAIN_LIST_TAB: IAssetType[] = [
  {
    type: 'account',
    name: '저축'
  },
  {
    type: 'bucketList',
    name: '버킷'
  }
];

function Main() {
  const [activeTab, setActiveTab] = useState<IAssetType>({
    type: 'account',
    name: '저축'
  });

  const [mainInfo, mainInfoLoading, mainInfoError] = useFetch<IMainInfo>('main', true);
  const [onAlert] = useAlert();

  if (!mainInfo || mainInfoLoading) {
    return <MainPageSkeleton />;
  }

  if (mainInfoError) {
    onAlert('정보를 불러오지 못했습니다.');
    return null;
  }

  return (
    <PageTemplate isMain>
      <TotalSavedAmount totalPrice={mainInfo.totalSavedAmount} />
      <AmountChart totalPrice={mainInfo.totalSavedAmount} lastMonthTotalPrice={mainInfo.totalSavedAmountExceptCurrentMonth} />
      <ToggleTab useListType tabs={MAIN_LIST_TAB} activeTab={activeTab} onChangeTab={setActiveTab} useOutline={false} />
      {activeTab.type === 'account' &&
        mainInfo.accounts.map((account, index) => <AccountListItem key={index} account={account} />)}
      {activeTab.type === 'bucketList' &&
        mainInfo.bucketList.map((bucket, index) => <BucketListItem key={index} bucketList={bucket} />)}
    </PageTemplate>
  );
}

export default Main;
