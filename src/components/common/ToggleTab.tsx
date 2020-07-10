import React from 'react';
import styled from 'styled-components';
import { IAssetType } from '../../models/IAssetType';

type ToggleTabProps = {
  tabs: IAssetType[];
  useOutline?: boolean;
  activeTab: IAssetType;
  onChangeTab: (tab: IAssetType) => void;
};

function ToggleTab({
  tabs,
  activeTab,
  useOutline = true,
  onChangeTab
}: ToggleTabProps) {
  return (
    <S.ToggleTab useOutline={useOutline}>
      {
        // 라인 없는 탭 구조
        !useOutline &&
          tabs.map((tab, index) => {
            return (
              <S.Tab
                key={tab.type}
                active={tab.name === activeTab.name}
                onClick={() => onChangeTab(tab)}
              >
                {tab.name}
              </S.Tab>
            );
          })
      }
      {
        // 아웃라인 탭 구조
        useOutline &&
          tabs.map((tab) => {
            return (
              <S.TabOutLine
                key={tab.type}
                active={tab.name === activeTab.name}
                onClick={() => onChangeTab(tab)}
              >
                {tab.name}
              </S.TabOutLine>
            );
          })
      }
    </S.ToggleTab>
  );
}

const S: {
  ToggleTab: any;
  Tab: any;
  TabOutLine: any;
} = {
  ToggleTab: styled.div`
    width: 100%;
    height: ${(props: any) => (props.useOutline ? '4' : '5')}rem;
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
  `,
  Tab: styled.button`
    width: 100%;
    color: ${(props: any) =>
      props.active ? props.theme.colors.navyD1 : props.theme.colors.blackL1};
    border-bottom: ${(props: any) => (props.active ? '.2rem' : '.1rem')} solid
      ${(props: any) =>
        props.active ? props.theme.colors.navyD1 : props.theme.colors.greyL1};
  `,
  TabOutLine: styled.button`
    width: 100%;
    border: 0.1rem solid
      ${(props: any) =>
        props.active ? props.theme.colors.navyD1 : props.theme.colors.greyL6};
    color: ${(props: any) =>
      props.active ? props.theme.colors.navyD1 : props.theme.colors.greyL6};
  `
};

export default ToggleTab;
