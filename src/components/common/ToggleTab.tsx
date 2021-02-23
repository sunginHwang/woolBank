import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { IAssetType } from '@models/IAssetType';
import { useWindowDimensions } from '@support/hooks/useWindowDemensions';

export interface ToggleTabProps {
  tabs: IAssetType[];
  useOutline?: boolean;
  useListType?: boolean;
  activeTab: IAssetType;
  onChangeTab?: (tab: IAssetType) => void;
}

function ToggleTab({ tabs, activeTab, useOutline = true, useListType = false, onChangeTab }: ToggleTabProps) {
  const { width } = useWindowDimensions();
  // 인디케이터 길이
  const indicatorWidth = width / tabs.length;
  const activeTabIndex = tabs.findIndex((tab) => tab.type === activeTab.type);

  const [indicatorLeftPosition, setIndicatorLeftPosition] = useState(indicatorWidth * activeTabIndex);
  let renderTabs = null;

  useEffect(() => {
    setIndicatorLeftPosition(indicatorWidth * activeTabIndex);
  }, [activeTab]);

  const onTabClick = (tab: IAssetType, index: number) => {
    setIndicatorLeftPosition(indicatorWidth * index);
    onChangeTab && onChangeTab(tab);
  };

  // 리스트 타입 구조
  if (useListType) {
    renderTabs = tabs.map((tab, index) => {
      return (
        <S.ListTab key={tab.type} active={tab.name === activeTab.name} onClick={() => onChangeTab && onChangeTab(tab)}>
          {tab.name}
        </S.ListTab>
      );
    });
  } else {
    if (useOutline) {
      // 아웃라인 탭 구조

      renderTabs =
        useOutline &&
        tabs.map((tab, index) => {
          return (
            <S.TabOutLine
              key={tab.type}
              active={tab.name === activeTab.name}
              onClick={() => onChangeTab && onChangeTab(tab)}
            >
              {tab.name}
            </S.TabOutLine>
          );
        });
    } else {
      // 라인 없는 탭 구조

      renderTabs = tabs.map((tab, index) => {
        return (
          <S.Tab key={tab.type} active={tab.name === activeTab.name} onClick={() => onTabClick(tab, index)}>
            {tab.name}
          </S.Tab>
        );
      });
    }
  }

  return (
    <S.ToggleTab useOutline={useOutline} useListType={useListType}>
      {renderTabs}
      {!useListType && !useOutline && <S.BottomLine width={indicatorWidth} left={indicatorLeftPosition} />}
    </S.ToggleTab>
  );
}

const S: {
  ToggleTab: any;
  Tab: any;
  TabOutLine: any;
  ListTab: any;
  BottomLine: any;
} = {
  ToggleTab: styled.div<{
    useOutline: boolean;
    useListType: boolean;
  }>`
    width: 100%;
    position: relative;
    height: ${({ useOutline }) => (useOutline ? '4' : '5')}rem;
    display: flex;
    justify-content: ${({ useListType }) => (useListType ? 'flex-start' : 'space-around')};
    margin-bottom: 1rem;
    ${({ useListType, useOutline }) =>
      !useListType &&
      !useOutline &&
      'box-shadow: 0 0.2rem 0.4rem -0.1rem rgba(0, 0, 0, 0.2), 0 0.4rem 0.5rem 0 rgba(0, 0, 0, 0.14),\n      0 0.1rem 1rem 0 rgba(0, 0, 0, 0.12);'};

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
  ListTab: styled.button<{
    active: boolean;
  }>`
    margin-right: 2.5rem;
    font-weight: 800;
    color: ${({ active, theme }) => (active ? theme.colors.blackL2 : theme.colors.greyL5)};
  `,
  TabOutLine: styled.button<{
    active: boolean;
  }>`
    width: 100%;
    border: 0.1rem solid ${({ active, theme }) => (active ? theme.colors.redL2 : theme.colors.greyL6)};
    background-color: ${({ active, theme }) => (active ? theme.colors.redL2 : theme.colors.white)};
    color: ${({ active, theme }) => (active ? theme.colors.white : theme.colors.greyL6)};
    
    &:first-child {
      border-bottom-left-radius: 1.3rem;
      border-top-left-radius: 1.3rem;
    }
    
    &:last-child {
      border-bottom-right-radius: 1.3rem;
      border-top-right-radius: 1.3rem;
    }
  `,
  BottomLine: styled.span<{
    width: number;
    left: number;
  }>`
    bottom: 0;
    width: ${({ width }) => width}px;
    left: ${({ left }) => left}px;
    height: 2px;
    position: absolute;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    background-color: ${({ theme }) => theme.colors.redL2};
  `
};

export default ToggleTab;
