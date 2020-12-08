import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { IAssetType } from '@models/IAssetType';
import { useWindowDimensions } from '@support/hooks/useWindowDemensions';

export interface TabsProps {
  tabs: IAssetType[];
  activeTab: IAssetType;
  onChangeTab?: (tab: IAssetType) => void;
}

function Tabs({ tabs, activeTab, onChangeTab }: TabsProps) {
  const { width } = useWindowDimensions();

  // 인디케이터 길이
  const indicatorWidth = width / tabs.length;
  const activeTabIndex = tabs.findIndex((tab) => tab.type === activeTab.type);

  const [indicatorLeftPosition, setIndicatorLeftPosition] = useState(indicatorWidth * activeTabIndex);

  useEffect(() => {
    setIndicatorLeftPosition(indicatorWidth * activeTabIndex);
  }, [activeTab]);

  const onTabClick = (tab: IAssetType, index: number) => {
    setIndicatorLeftPosition(indicatorWidth * index);
    onChangeTab && onChangeTab(tab);
  };

  return (
    <S.Tabs data-cy='tabs'>
      {tabs.map((tab, index) => {
        return (
          <S.Tab
            key={tab.type}
            active={tab.name === activeTab.name}
            data-cy={tab.name}
            onClick={() => onTabClick(tab, index)}>
            {tab.name}
          </S.Tab>
        );
      })}
      <S.BottomLine width={indicatorWidth} left={indicatorLeftPosition} />
    </S.Tabs>
  );
}

const S: {
  Tabs: any;
  Tab: any;
  BottomLine: any;
} = {
  Tabs: styled.div`
    width: 100%;
    height: 3.8rem;
    position: relative;
    display: flex;
    justify-content: space-around;
    /*box-shadow: 0 0.2rem 0.4rem -0.1rem rgba(0, 0, 0, 0.2), 0 0.4rem 0.5rem 0 rgba(0, 0, 0, 0.14),
      0 0.1rem 1rem 0 rgba(0, 0, 0, 0.12); 그림자 효과*/
    border-bottom: .2rem solid ${({ theme }) => theme.colors.greyL2};
    button {
      font-size: 1.4rem;
    }
  `,
  Tab: styled.button<{
    active: boolean;
  }>`
    width: 100%;
    font-weight: bold;
    color: ${({ active, theme }) => (active ? theme.colors.redL2 : theme.colors.greyL1)};
  `,
  BottomLine: styled.span<{
    width: number;
    left: number;
  }>`
    bottom: .5px;
    width: ${({ width }) => width}px;
    left: ${({ left }) => left}px;
    height: .2rem;
    position: absolute;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    background-color: ${({ theme }) => theme.colors.redL2};
  `
};

export default Tabs;
