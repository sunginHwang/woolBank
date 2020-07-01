import React from 'react';
import styled from 'styled-components';

type ToggleTabProps = {
  tabs: string[];
  activeTab: string;
  onChangeTab: (tab: string) => void;
};

function ToggleTab({
                     tabs,
                     activeTab,
                     onChangeTab
                   }: ToggleTabProps) {
  return (
    <S.ToggleTab>
      {
        tabs.map((tab, index) => {
          return (
            <S.Tab key={index}
                   active={tab === activeTab}
                   onClick={() => onChangeTab(tab)}
              >{tab}</S.Tab>
          )
        })
      }
    </S.ToggleTab>
  );
};

const S: {
  ToggleTab: any;
  Tab: any
} = {
  ToggleTab: styled.div`
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
  `,
  Tab : styled.button`
    width: 100%;
    color: ${(props: any) => props.active ? props.theme.colors.navyD1 : props.theme.colors.blackL1};
    border-bottom: ${(props: any) => props.active ? '.2rem': '.1rem'} solid ${(props: any) => props.active ? props.theme.colors.navyD1: props.theme.colors.greyL1};
  `
};

export default ToggleTab;