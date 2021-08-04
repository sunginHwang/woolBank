import React, { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router';

import Tabs from '@components/atoms/Tabs';
import PageTemplate from '@components/layout/PageTemplate';
import { IAssetType } from '@models/IAssetType';
import { useQuery } from '@support/hooks/UseQuery';
import { ListTab, StatisticTab, RegularExpenditureListTab } from './tab';

const menuTabs: IAssetType[] = [
  {
    type: 'list',
    name: '리스트'
  },
  {
    type: 'regular-expenditure',
    name: '정기지출'
  },
  {
    type: 'statistic',
    name: '통계'
  }
];

/**
 * 가계부 리스트 페이징
 * @component
 */

function AccountBook() {
  const history = useHistory();
  const { pathname } = useLocation();
  const { tab } = useQuery(['tab']);

  const onTabChange = (activeTab: IAssetType) => {
    const searchParam = new URLSearchParams({ tab: activeTab.type });
    // history 추가가 아닌 queryString 만 replace 전환
    history.replace({ pathname, search: searchParam.toString() });
  };

  const activeTabMenu = useMemo(() => getActiveTab(tab), [tab]);

  return (
    <PageTemplate
      title='가계부'
      useBackButton={false}
      useSidePadding={false}
      tabs={<Tabs tabs={menuTabs} activeTab={activeTabMenu} onChangeTab={onTabChange} />}
    >
      <div style={{ padding: '2rem' }}>{getContentSlide(activeTabMenu.type)}</div>
    </PageTemplate>
  );
}

function getContentSlide(type: string) {
  switch (type) {
    case 'list':
      return <ListTab />;
    case 'regular-expenditure':
      return <RegularExpenditureListTab />;
    case 'statistic':
      return <StatisticTab />;
    default:
      return null;
  }
}

function getActiveTab(tabType?: string) {
  if (!tabType) {
    return menuTabs[0];
  }

  const initTab = menuTabs.find((menu) => menu.type === tabType);
  return initTab || menuTabs[0];
}

export default AccountBook;
