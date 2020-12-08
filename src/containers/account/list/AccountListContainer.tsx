import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import AddButton from '@components/common/AddButton';
import TabSlideViewer from '@components/common/TabSlideViewer';
import ListSkeleton from '@components/common/ListSkeleton';
import AccountListItem from '@components/account/AccountListItem';
import AccountListItemSkeleton from '@components/account/list/AccountListItemSkeleton';

import { RootState } from '@/store';
import { getAccountList } from '@store/modules/AccountList';
import { getAccountListLastUpdatedAt } from '@support/api/accountApi';
import { checkNeedReFetch } from '@support/util/checkNeedReFetch';
import { IAssetType } from '@models/IAssetType';
import EmptyList from '@components/common/EmptyList';

const tabs: IAssetType[] = [
  {
    type: 'progress',
    name: '진행중'
  },
  {
    type: 'complete',
    name: '완료'
  }
];

const title = '자산관리';

function AccountListContainer() {
  const accountList = useSelector((state: RootState) => state.AccountList.accountList);
  const lastUpdatedDate = useSelector((state: RootState) => state.AccountList.lastUpdatedDate);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    onLoadAccountList();
  }, []);

  /**
   * 예적금 등록 페이지 이동
   **/
  const goAccountRegisterPage = () => {
    history.push('/accounts/save');
  };

  /**
   * 예적금 리스트 조회
   **/
  const onLoadAccountList = async () => {
    // 캐싱 날짜 없으면 바로 조회
    const needFetch = await checkNeedReFetch(lastUpdatedDate, getAccountListLastUpdatedAt);
    needFetch && dispatch(getAccountList());
  };

  const progressAccountList = accountList.data.filter((account) => !account.isExpiration);
  const endAccountList = accountList.data.filter((account) => account.isExpiration);

  // 진행중 리스트
  const renderProgressAccountList =
    progressAccountList.length === 0 ? (
      <EmptyList message='진행중인 예/적금 내역이 없습니다. :(' />
    ) : (
      progressAccountList.map((account, index) => <AccountListItem key={index} account={account} useSideMargin />)
    );

  // 완료 상태 리스트
  const renderEndAccountList =
    endAccountList.length === 0 ? (
      <EmptyList message='완료된 예/적금 내역이 없습니다. :(' />
    ) : (
      endAccountList.map((account, index) => <AccountListItem key={index} account={account} useSideMargin />)
    );

  // 로딩 skeleton
  if (!accountList.data || accountList.loading) {
    return <ListSkeleton title={title} item={<AccountListItemSkeleton />} />;
  }

  return (
    <>
      <TabSlideViewer tabs={tabs} slideViewList={[renderProgressAccountList, renderEndAccountList]} title={title} />
      <AddButton icon='+' onClick={goAccountRegisterPage} />
    </>
  );
}

export default AccountListContainer;
