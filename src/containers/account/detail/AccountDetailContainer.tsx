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
  const dispatch = useDispatch();

  useEffect(() => {
    onLoadAccountDetail(accountId);

    return () => {
      // 리스트 -> 상세 재 진입시 이전 상세 데이터가 잠시 보이는 부분이 있어 삭제 처리
      dispatch(AccountDetail.actions.clearAccountDetail());
    }
  }, [accountId]);

  // 예적금 상세 정보 조회
  const onLoadAccountDetail = async (id: number) => {
    // 캐싱 정보 먼저 입력
    dispatch(AccountDetail.actions.setAccountDetailFromCache(accountId));
    if (!accountDetail.data) {
      dispatch(getAccount(id));
      return;
    }

    // 실제로 정보가 변경될 경우 request 요청
    const currentUpdatedAt = new Date(accountDetail.data.updatedAt);
    const needFetch = await checkNeedReFetch(currentUpdatedAt, getAccountLastUpdatedAt, [id]);
    needFetch && dispatch(getAccount(id));
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
    return (
      <div>
        <p>존재하지 않는 예적금 상품입니다.</p>
      </div>
    );
  }

  return (
    <>
      <AccountInfo account={accountDetail.data} />
      <DepositList depositList={accountDetail.data.deposits} />
    </>
  );
}

export default AccountDetailContainer;
