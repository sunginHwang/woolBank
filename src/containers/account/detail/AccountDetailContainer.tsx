import React, { useEffect } from 'react';
import DepositList from '../../../components/account/DepositList';
import AccountInfo from '../../../components/account/AccountInfo';
import AccountInfoPlaceHolder from '../../../components/account/detail/AccountInfoplaceHolder';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import AccountDetail, { getAccount } from '../../../store/modules/AccountDetail';
import { checkNeedReFetch } from '../../../support/util/checkNeedReFetch';
import { getAccountLastUpdatedAt } from '../../../support/api/accountApi';

type AccountDetailContainerProps = {
  accountId: number;
};

function AccountDetailContainer({ accountId }: AccountDetailContainerProps) {
  const accountDetail = useSelector((state: RootState) => state.AccountDetail.accountDetail);
  const accountDetailCache = useSelector((state: RootState) => state.AccountDetail.accountDetailCache);

  const dispatch = useDispatch();

  useEffect(() => {
    onLoadAccountDetail(accountId);

    return () => {
      // 리스트 -> 상세 재 진입시 이전 상세 데이터가 잠시 보이는 부분이 있어 삭제 처리
      dispatch(AccountDetail.actions.clearAccountDetail());
    };
  }, [accountId]);

  // 예적금 상세 정보 조회
  const onLoadAccountDetail = async (id: number) => {
    // 1. 캐싱 정보 조회
    const accountDetail = accountDetailCache.find((account) => account.id === id);

    // 2. 캐시 없을경우 fetch
    if (!accountDetail) {
      dispatch(getAccount(id));
      return;
    }

    const currentUpdatedAt = new Date(accountDetail.updatedAt);
    const needFetch = await checkNeedReFetch(currentUpdatedAt, getAccountLastUpdatedAt, [id]);
    // 실제로 정보가 변경될 경우 request 요청 아닌 경우 캐시 사용
    needFetch ? dispatch(getAccount(id)) : dispatch(AccountDetail.actions.setAccountDetail(accountDetail));
  };

  if (accountDetail.loading) {
    return (
      <>
        <AccountInfoPlaceHolder />
        <DepositList isLoading />
      </>
    );
  }

  if (!accountDetail.data) {
    return null;
  }

  return (
    <>
      <AccountInfo account={accountDetail.data} />
      <DepositList depositList={accountDetail.data.deposits} />
    </>
  );
}

export default AccountDetailContainer;
