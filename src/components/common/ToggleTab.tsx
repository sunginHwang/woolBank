import React from 'react';
import styled from 'styled-components';

type ToggleTabProps = {
  tabs: string[];
  useOutline?: boolean;
  activeTab: string;
  onChangeTab: (tab: string) => void;
};

function ToggleTab({
                     tabs,
                     activeTab,
                     useOutline = true,
                     onChangeTab
                   }: ToggleTabProps) {

  return (
    <S.ToggleTab useOutline={useOutline}>
      { // 라인 없는 탭 구조
        !useOutline && tabs.map((tab, index) => {
          return (
            <S.Tab key={index}
                   active={tab === activeTab}
                   onClick={() => onChangeTab(tab)}>
              {tab}
            </S.Tab>
          );
        })
      }
      { // 아웃라인 탭 구조
        useOutline && tabs.map((tab, index) => {
          return (
            <S.TabOutLine key={index}
                          active={tab === activeTab}
                          onClick={() => onChangeTab(tab)}>
              {tab}
            </S.TabOutLine>
          );
        })
      }
    </S.ToggleTab>
  );
};

const S: {
  ToggleTab: any;
  Tab: any;
  TabOutLine: any;
} = {
  ToggleTab: styled.div`
    width: 100%;
    height: ${(props: any) => props.useOutline ? '4' : '5'}rem;
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
  `,
  Tab: styled.button`
    width: 100%;
    border: .1rem solid ${(props: any) => props.active ? props.theme.colors.navyD1 : props.theme.colors.greyL1};
    color: ${(props: any) => props.active ? props.theme.colors.navyD1 : props.theme.colors.blackL1};
    border-bottom: ${(props: any) => props.active ? '.2rem' : '.1rem'} solid ${(props: any) => props.active ? props.theme.colors.navyD1 : props.theme.colors.greyL1};
  `,
  TabOutLine: styled.button`
    width: 100%;
    border: .1rem solid ${(props: any) => props.active ? props.theme.colors.navyD1 : props.theme.colors.greyL6};
    color: ${(props: any) => props.active ? props.theme.colors.navyD1 : props.theme.colors.greyL6};
   
  `
};

export default ToggleTab;