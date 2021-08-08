import React from 'react';
import { useQuery } from 'react-query';

import TabSlideViewer from '@components/common/TabSlideViewer';
import AccountListItem from '@components/account/list/AccountListItem';
import { fetchAccountList } from '@support/api/accountApi';
import { IAccount } from '@models/account/IAccount';
import options from './options';

const { emptyMsg, tabs, title } = options;

/**
 * 예적금 리스트 슬라이드 뷰어
 * @component
 */

function AccountSlideViewer() {
  const { data: accountList = [], isFetching } = useQuery<IAccount[]>('accountList', fetchAccountList);
  const renderProgressAccountList = renderList('progress', accountList);
  const renderCompleteAccountList = renderList('complete', accountList);

  if (isFetching) {
    return <TabSlideViewer.Skeleton title={title} item={<AccountListItem.Skeleton />} />;
  }

  return (
    <TabSlideViewer tabs={tabs} slideViewList={[renderProgressAccountList, renderCompleteAccountList]} title={title} />
  );
}

function renderList(type: 'complete' | 'progress', list: IAccount[]) {
  const listWithFilter = list.filter(({ isExpiration }) => type === 'complete' ? isExpiration : !isExpiration);

  if (listWithFilter.length === 0) {
    return <TabSlideViewer.EmptyList message={emptyMsg[type]} />;
  }

  return listWithFilter.map(account => <AccountListItem key={account.id} account={account} useSideMargin />);
}

export default AccountSlideViewer;
