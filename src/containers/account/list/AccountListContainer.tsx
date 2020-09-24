import React, { useEffect } from 'react';
import { IAssetType } from '../../../models/IAssetType';
import AccountListItem from '../../../components/account/AccountListItem';
import AccountListItemSkeleton from '../../../components/account/list/AccountListItemSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getAccountListLastUpdatedAt } from '../../../support/api/accountApi';
import { getAccountList } from '../../../store/modules/AccountList';
import { checkNeedReFetch } from '../../../support/util/checkNeedReFetch';
import AddButton from '../../../components/common/AddButton';
import { useHistory } from 'react-router';
import 'swiper/swiper-bundle.min.css';
import TabSlideViewer from '../../../components/common/TabSlideViewer';
import ListSkeleton from '../../../components/common/ListSkeleton';

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
    history.push('/accounts/register');
  };

  /**
   * 예적금 리스트 조회
   **/
  const onLoadAccountList = async () => {
    // 캐싱 날짜 없으면 바로 조회
    const needFetch = await checkNeedReFetch(lastUpdatedDate, getAccountListLastUpdatedAt);
    needFetch && dispatch(getAccountList());
  };

  // 진행중 리스트
  const renderProgressAccountList = accountList.data
    .filter((account) => !account.isExpiration)
    .map((account, index) => <AccountListItem key={index} account={account} useSideMargin />);

  // 완료 상태 리스트
  const renderEndAccountList = accountList.data
    .filter((account) => account.isExpiration)
    .map((account, index) => <AccountListItem key={index} account={account} useSideMargin />);

  // 로딩 skeleton
  if (!accountList.data || accountList.loading) {
    return <ListSkeleton item={<AccountListItemSkeleton />} />;
  }

  return (
    <>
      <TabSlideViewer tabs={tabs} slideViewList={[renderProgressAccountList, renderEndAccountList]} />
      <AddButton icon='+' onClick={goAccountRegisterPage} />
    </>
  );
}

export default AccountListContainer;
