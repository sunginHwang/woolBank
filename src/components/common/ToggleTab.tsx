import React from 'react';
import styled from 'styled-components';
import { IAssetType } from '../../models/IAssetType';

type ToggleTabProps = {
  tabs: IAssetType[];
  useOutline?: boolean;
  useListType?: boolean;
  activeTab: IAssetType;
  onChangeTab: (tab: IAssetType) => void;
};

function ToggleTab({ tabs, activeTab, useOutline = true, useListType = false, onChangeTab }: ToggleTabProps) {
  let renderTabs = null;

  // 리스트 타입 구조
  if (useListType) {
    renderTabs = tabs.map((tab, index) => {
      return (
        <S.ListTab key={tab.type} active={tab.name === activeTab.name} onClick={() => onChangeTab(tab)}>
          {tab.name}
        </S.ListTab>
      );
    });
  } else {
    if (useOutline) {
      // 아웃라인 탭 구조

      renderTabs =
        useOutline &&
        tabs.map((tab) => {
          return (
            <S.TabOutLine key={tab.type} active={tab.name === activeTab.name} onClick={() => onChangeTab(tab)}>
              {tab.name}
            </S.TabOutLine>
          );
        });
    } else {
      // 라인 없는 탭 구조

      renderTabs = tabs.map((tab, index) => {
        return (
          <S.Tab key={tab.type} active={tab.name === activeTab.name} onClick={() => onChangeTab(tab)}>
            {tab.name}
          </S.Tab>
        );
      });
    }
  }

  return (
    <S.ToggleTab useOutline={useOutline} useListType={useListType}>
      {renderTabs}
    </S.ToggleTab>
  );
}

const S: {
  ToggleTab: any;
  Tab: any;
  TabOutLine: any;
  ListTab: any;
} = {
  ToggleTab: styled.div`
    width: 100%;
    height: ${(props: any) => (props.useOutline ? '4' : '5')}rem;
    display: flex;
    justify-content: ${(props: any) => (props.useListType ? 'flex-start' : 'space-around')};
    margin-bottom: 1rem;

    button {
      font-size: 1.6rem;
    }
  `,
  Tab: styled.button`
    width: 100%;
    color: ${(props: any) => (props.active ? props.theme.colors.redL2 : props.theme.colors.blackL1)};
    border-bottom: ${(props: any) => (props.active ? '.2rem' : '.1rem')} solid
      ${(props: any) => (props.active ? props.theme.colors.redL2 : props.theme.colors.greyL1)};
  `,
  ListTab: styled.button`
    margin-right: 2.5rem;
    font-weight: 800;
    color: ${(props: any) => (props.active ? props.theme.colors.blackL2 : props.theme.colors.greyL5)};
  `,
  TabOutLine: styled.button`
    width: 100%;
    border: 0.1rem solid ${(props: any) => (props.active ? props.theme.colors.redL2 : props.theme.colors.greyL6)};
    color: ${(props: any) => (props.active ? props.theme.colors.redL2 : props.theme.colors.greyL6)};
  `
};

export default ToggleTab;
