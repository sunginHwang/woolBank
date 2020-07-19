import React from 'react';
import { IAccount } from '../../../models/IAccount';
import { INSTALLMENT_SAVINGS, TAX_TYPE } from '../../../support/constants';
import DepositRecord from '../../../components/account/DepositRecord';
import AccountInfo from '../../../components/account/AccountInfo';
import AccountInfoPlaceHolder from '../../../components/account/detail/AccountInfoplaceHolder';
import { useLoading } from '../../../support/hooks/UseTempLoading';

const account: IAccount = {
  title: '첫 고정적금',
  amount: 40000000,
  currentAmount: 30000,
  startDate: '2019-01-01',
  endDate: '2021-01-01',
  savingType: INSTALLMENT_SAVINGS[0],
  taxType: TAX_TYPE.NORMAL_TAX,
  rate: 0.1,
  depositRecords: [
    {
      amount: 50000,
      balance: 2000000,
      depositDate: new Date('2019-04-01')
    },
    {
      amount: 10000,
      balance: 1000000,
      depositDate: new Date('2019-01-01')
    },
    {
      amount: 20000,
      balance: 1200000,
      depositDate: new Date('2019-02-01')
    },
    {
      amount: 30000,
      balance: 1500000,
      depositDate: new Date('2019-03-01')
    }
  ]
};

type AccountDetailContainerProps = {
  accountId: number;
};

function AccountDetailContainer({ accountId }: AccountDetailContainerProps) {
  const loading = useLoading();

  return (
    <>
      {
        loading ? <AccountInfoPlaceHolder /> : <AccountInfo account={account} />
      }
      <DepositRecord depositRecords={account.depositRecords} isLoading={loading} />
    </>
  );
}

export default AccountDetailContainer;
