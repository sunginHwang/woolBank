import React, { useState } from 'react';
import styled from 'styled-components';

import ToggleTab from '@components/common/ToggleTab';
import AccountListItem from '@components/account/list/AccountListItem';
import BucketListItem from '@components/bucketList/list/BucketListItem';
import { IAssetType } from '@models/IAssetType';
import { IAccount } from '@models/IAccount';
import { IBucketList } from '@models/IBucketList';

const MAIN_TAB_LIST: IAssetType[] = [
  {
    type: 'account',
    name: '저축'
  },
  {
    type: 'bucketList',
    name: '버킷'
  }
];

interface IProps {
  accounts: IAccount[];
  bucketList: IBucketList[];
}

/**
 * 메인페이지 - 저축, 버킷 리스트 탭 영역
 * @component
 */

function TabList({ accounts, bucketList }: IProps) {
  const [activeTab, setActiveTab] = useState<IAssetType>(MAIN_TAB_LIST[0]);

  const isAccountTab = activeTab.type === 'account';
  return (
    <>
      <ToggleTab useListType tabs={MAIN_TAB_LIST} activeTab={activeTab} onChangeTab={setActiveTab} useOutline={false} />
      {isAccountTab && accounts.map(account => <AccountListItem key={account.id} account={account} />)}
      {!isAccountTab && bucketList.map(bucket => <BucketListItem key={bucket.id} bucketList={bucket} />)}
      <S.BottomSpacing />
    </>
  );
}

export default TabList;

const S = {
  BottomSpacing: styled.div`
    margin-top: 8.5rem;
    height: 1rem;
  `
};
