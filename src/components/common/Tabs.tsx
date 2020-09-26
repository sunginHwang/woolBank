import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { IAssetType } from '@models/IAssetType';
import { useWindowDimensions } from '@support/hooks/useWindowDemensions';

export interface TabsProps {
  tabs: IAssetType[];
  activeTab: IAssetType;
  onChangeTab?: (tab: IAssetType) => void;
};

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
    <S.Tabs>
      {tabs.map((tab, index) => {
        return (
          <S.Tab key={tab.type} active={tab.name === activeTab.name} onClick={() => onTabClick(tab, index)}>
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
    height: 5rem;
    position: relative;
    display: flex;
    justify-content: space-around;
    box-shadow: 0 0.2rem 0.4rem -0.1rem rgba(0, 0, 0, 0.2), 0 0.4rem 0.5rem 0 rgba(0, 0, 0, 0.14),
      0 0.1rem 1rem 0 rgba(0, 0, 0, 0.12);

    button {
      font-size: 1.6rem;
    }
  `,
  Tab: styled.button`
    width: 100%;
    font-weight: bold;
    color: ${(props: any) => (props.active ? props.theme.colors.redL2 : props.theme.colors.greyL1)};
  `,
  BottomLine: styled.span`
    bottom: 0;
    width: ${(props: any) => props.width}px;
    left: ${(props: any) => props.left}px;
    height: 2px;
    position: absolute;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    background-color: ${(props: any) => props.theme.colors.redL2};
  `
};

export default Tabs;
