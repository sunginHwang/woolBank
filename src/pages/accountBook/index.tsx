import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router';

import Tabs from '@components/common/Tabs';
import PageTemplate from '@components/layout/PageTemplate';
import RegularExpenditureList from '@containers/regularExpenditure/list/RegularExpenditureList';

import { IAssetType } from '@models/IAssetType';

const urlPrefix = '/account-books';
const menuTabs: IAssetType[] = [{
  type: 'list',
  name: '리스트',
}, {
  type: 'regular-expenditure',
  name: '정기지출',
}, {
  type: 'sum',
  name: '통계',
}];
/**
 * 가계부 리스트 페이징
 * @component
 */

function AccountBookList() {
  const [ activeTab, setActiveTab ] = useState(menuTabs[0]);
  const history = useHistory();

  const onChangeTab = (tab: IAssetType) => {
    setActiveTab(tab);
    history.push(`${urlPrefix}/${tab.type}`);
  };

  return (
    <PageTemplate title='가계부' useSidePadding={false}>
      <Tabs tabs={menuTabs} activeTab={activeTab} onChangeTab={onChangeTab} />
      <div style={{padding: '2rem'}}>
        <Switch>
          <Route
            path='/account-books/list'
            component={List}
          />
          <Route
            path='/account-books/regular-expenditure'
            component={RegularExpenditureList}
          />
        </Switch>
      </div>
    </PageTemplate>
  );
}

function List() {
  return <div>리스트</div>
}

export default AccountBookList;
