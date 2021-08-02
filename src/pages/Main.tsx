import React from 'react';
import { useQuery } from 'react-query';

import PageTemplate from '@components/layout/PageTemplate';
import MainPageSkeleton from '@components/main/MainPageSkeleton';
import TotalSaveAmount from '@components/main/TotalSaveAmount';
import AmountCompareInfo from '@components/main/AmountCompareInfo';
import TabList from '@components/main/ListTab';

import { useAlert } from '@support/hooks/useAlert';
import { fetchMainInfo } from '@support/api/mainApi';
import { IMainInfo } from '@models/main/IMainInfo';

const initInfo: IMainInfo = {
  totalSavedAmount: 0,
  totalSavedAmountExceptCurrentMonth: 0,
  accounts: [],
  bucketList: []
};

/**
 * 메인페이지
 * @component
 */

function Main() {
  const {
    data: mainInfo = initInfo, isLoading, isError
  } = useQuery<IMainInfo>('mainInfo', fetchMainInfo);
  const [onAlert] = useAlert();

  if (isLoading) {
    return <MainPageSkeleton />;
  }

  if (isError) {
    onAlert('정보를 불러오지 못했습니다.');
    return null;
  }

  return (
    <PageTemplate isMain>
      <TotalSaveAmount totalPrice={mainInfo.totalSavedAmount} />
      <AmountCompareInfo
        totalPrice={mainInfo.totalSavedAmount}
        lastMonthTotalPrice={mainInfo.totalSavedAmountExceptCurrentMonth}
      />
      <TabList accounts={mainInfo.accounts} bucketList={mainInfo.bucketList} />
    </PageTemplate>
  );
}

export default Main;
