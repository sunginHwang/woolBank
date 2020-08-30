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
  const accountDetailList = useSelector((state: RootState) => state.AccountDetail.accountDetailList);
  const dispatch = useDispatch();

  useEffect(() => {
    onLoadAccountDetail(accountId);
  }, [accountId]);

  // 예적금 상세 정보 조회
  const onLoadAccountDetail = async (id: number) => {
    const account = getAccountById(id);

    if (!account) {
      dispatch(getAccount(id));
      return;
    }

    // 실제로 정보가 변경될 경우 request 요청
    const currentUpdatedAt = new Date(account.updatedAt);
    const needFetch = await checkNeedReFetch(currentUpdatedAt, getAccountLastUpdatedAt, [id]);
    needFetch && dispatch(getAccount(id));
  };

  // 캐싱된 상세 정보들 중에서 현재 선택된 정보 조회
  const getAccountById = (id: number) => {
    return accountDetailList.data.find(account => account.id === id);
  };

  const account = getAccountById(accountId);

  if (accountDetailList.loading) {
    return (
      <>
        <AccountInfoPlaceHolder />
        <DepositList isLoading />
      </>
    );
  }

  if (!account) {
    return null;
  }

  return (
    <>
      <AccountInfo account={account} />
      <DepositList depositList={account.deposits} />
    </>
  );
}

export default AccountDetailContainer;
