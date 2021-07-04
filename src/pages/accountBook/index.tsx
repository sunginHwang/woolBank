import React, { useState } from 'react';
import { useHistory } from 'react-router';

import Tabs from '@components/common/Tabs';
import PageTemplate from '@components/layout/PageTemplate';
import AccountBookListPage from '@pages/accountBook/list';
import RegularExpenditureList from '@containers/regularExpenditure/list/RegularExpenditureList';

import { IAssetType } from '@models/IAssetType';
import AccountBookStatistic from '@components/accountBook/statistic/AccountBookStatistic';

const urlPrefix = '/account-books';
const menuTabs: IAssetType[] = [{
  type: 'list',
  name: '리스트',
}, {
  type: 'regular-expenditure',
  name: '정기지출',
}, {
  type: 'statistic',
  name: '통계',
}];

/**
 * 가계부 리스트 페이징
 * @component
 */

function AccountBook() {
  const history = useHistory();
  const [ activeTab, setActiveTab ] = useState(getInitTab(history.location.pathname));

  return (
    <PageTemplate
      title='가계부'
      useBackButton={false}
      useSidePadding={false}
      tabs={<Tabs tabs={menuTabs} activeTab={activeTab} onChangeTab={setActiveTab} />}
    >
      <div style={{padding: '2rem'}}>
        {getContentSlide(activeTab.type)}
      </div>
    </PageTemplate>
  );
}

function getContentSlide(type: string) {
  switch (type) {
    case 'list' :
      return <AccountBookListPage />;
    case 'regular-expenditure' :
      return <RegularExpenditureList />;
    case 'statistic' :
      return <AccountBookStatistic />;
    default :
      return null;
  }
}

function getInitTab(pathname: string) {
  const initTab = menuTabs.find(menu => menu.type === pathname.split(urlPrefix+'/')[1]);
  return initTab || menuTabs[2];
}

export default AccountBook;
