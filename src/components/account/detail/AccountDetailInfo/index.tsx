import React from 'react';

import DepositList from '@components/account/detail/DepositList';
import AccountInfo from '@components/account/detail/AccountInfo';
import BottomButton from '@components/common/BottomButton';
import useAccountQuery from '@/services/account/useAccountQuery';
import DetailInfoSkeleton from './DetailInfoSkeleton';

interface IProps {
  accountId: number;
}

/**
 * 예적금 상세 - 계좌 상세 정보
 * @component
 */

function AccountDetailInfo({ accountId }: IProps) {
  const { account, isLoading, isEmpty } = useAccountQuery(accountId);

  if (isLoading || isEmpty) {
    return <DetailInfoSkeleton />;
  }

  return (
    <>
      <AccountInfo account={account} />
      <DepositList depositList={account.deposits} />
      {
        account.isExpiration && <BottomButton isShow message='만기 완료' active={false} />
      }
    </>
  );
}

export default AccountDetailInfo;
