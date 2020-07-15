import React, { useState } from 'react';
import styled from 'styled-components';
import ToggleTab from '../../../components/common/ToggleTab';
import { IAssetType } from '../../../models/IAssetType';
import { IAccount } from '../../../models/IAccount';
import { INSTALLMENT_SAVINGS, TAX_TYPE } from '../../../support/constants';
import AccountListItem from '../../../components/account/AccountListItem';

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

const accounts: IAccount[] = [
  {
    id: 1,
    title: '첫 고정적금',
    amount: 40000000,
    currentAmount: 30000,
    startDate: '2019-01-01',
    endDate: '2021-01-01',
    savingType: INSTALLMENT_SAVINGS[0],
    taxType: TAX_TYPE.NORMAL_TAX,
    rate: 0.1
  },
  {
    id: 2,
    title: '두번째 적금',
    amount: 40000000,
    currentAmount: 30000,
    startDate: '2019-02-01',
    endDate: '2022-02-01',
    savingType: INSTALLMENT_SAVINGS[1],
    taxType: TAX_TYPE.NORMAL_TAX,
    rate: 0.2
  },
  {
    id: 3,
    title: '마지막 고정적금',
    amount: 40000000,
    currentAmount: 30000,
    startDate: '2019-02-11',
    endDate: '2024-02-11',
    savingType: INSTALLMENT_SAVINGS[2],
    taxType: TAX_TYPE.NORMAL_TAX,
    rate: 0.3
  }
];

function AccountListContainer() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <>
      <S.Wrapper>
        <ToggleTab
          tabs={tabs}
          useOutline={false}
          activeTab={activeTab}
          onChangeTab={setActiveTab}
        />
        <S.List>
          {accounts.map((account, index) => (
            <AccountListItem key={index} account={account} />
          ))}
        </S.List>
      </S.Wrapper>
    </>
  );
}

export default AccountListContainer;

const S: {
  Wrapper: any;
  List: any;
} = {
  Wrapper: styled.div``,
  List: styled.div`
    margin-top: 2rem;
  `
};
