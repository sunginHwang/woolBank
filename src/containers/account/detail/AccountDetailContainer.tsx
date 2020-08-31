import React, { useEffect } from 'react';
import DepositList from '../../../components/account/DepositList';
import AccountInfo from '../../../components/account/AccountInfo';
import AccountInfoPlaceHolder from '../../../components/account/detail/AccountInfoplaceHolder';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getAccount } from '../../../store/modules/AccountDetail';
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
  }, [accountId]);

  // 예적금 상세 정보 조회
  const onLoadAccountDetail = async (id: number) => {
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
