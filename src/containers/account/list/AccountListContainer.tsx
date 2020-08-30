import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ToggleTab from '../../../components/common/ToggleTab';
import { IAssetType } from '../../../models/IAssetType';
import AccountListItem from '../../../components/account/AccountListItem';
import AccountListItemPlaceHolder from '../../../components/account/list/AccountListItemPlaceHolder';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getAccountListLastUpdatedAt } from '../../../support/api/accountApi';
import { getAccountList } from '../../../store/modules/AccountList';
import { checkNeedReFetch } from '../../../support/util/checkNeedReFetch';

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
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const accountList = useSelector((state: RootState) => state.AccountList.accountList);
  const lastUpdatedDate = useSelector((state: RootState) => state.AccountList.lastUpdatedDate);
  const dispatch = useDispatch();

  const onLoadAccountList = async () => {
    // 캐싱 날짜 없으면 바로 조회
    const needFetch = await checkNeedReFetch(lastUpdatedDate, getAccountListLastUpdatedAt);
    needFetch && dispatch(getAccountList());
  };

  useEffect(() => {
    onLoadAccountList();
  }, []);

  return (
    <>
      <ToggleTab
        tabs={tabs}
        useOutline={false}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
      />
      <S.List>
        {
          accountList.loading
            ? [...Array(10)].map((_, key) => <AccountListItemPlaceHolder key={key} />)
            : accountList.data.map((account, index) => (
              <AccountListItem key={index} account={account} />
            ))
        }
      </S.List>
    </>
  );
}

export default AccountListContainer;

const S: {
  List: any;
} = {
  List: styled.div`
    margin: 2rem 0 15rem 0;
  `
};
