import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';

import ListWrapper from '@components/common/ListWrapper';
import Tabs from '@components/common/Tabs';

import { IAssetType } from '@models/IAssetType';
import 'swiper/swiper-bundle.min.css';
import '@style/css/tabSlideViewer.css';

export interface ITabSlideViewerProps {
  tabs: IAssetType[];
  slideViewList: ReactNode[];
  title: string;
}

function TabSlideViewer({ tabs, slideViewList, title }: ITabSlideViewerProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [tabIndex, setTavIndex] = useState(0);

  /**
   * 탭 변경 이벤트
   **/
  const onTabChange = (tab: IAssetType) => {
    setActiveTab(tab);
    setTavIndex(tabs.findIndex((t) => t.type === tab.type));
  };

  /**
   * 리스트 뷰 스와이프
   **/
  const onSlideTo = (index: number) => {
    setTavIndex(index);
    setActiveTab(tabs[index]);
  };

  return (
    <>
      <S.FixedHeader>
        <S.ListTitle>
          <p>{title}</p>
        </S.ListTitle>
        <Tabs tabs={tabs} activeTab={activeTab} onChangeTab={onTabChange} />
      </S.FixedHeader>
      <ListWrapper>
        <SwipeableViews index={tabIndex} onChangeIndex={onSlideTo} style={{ height: '100%' }}>
          {slideViewList.map((view, index) => (
            <S.ListContent key={index}>{view}</S.ListContent>
          ))}
        </SwipeableViews>
      </ListWrapper>
    </>
  );
}

export default TabSlideViewer;

const S: {
  FixedHeader: any;
  ListTitle: any;
  ListContent: any;
} = {
  FixedHeader: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: ${({ theme }) => theme.zIndex.header};
    background-color: ${({ theme }) => theme.colors.white};
  `,
  ListContent: styled.div`
    padding: 2rem 0;
  `,
  ListTitle: styled.div`
    height: 4.8rem;
    display: flex;
    justify-content: flex-start;
    margin-left: 2rem;
    align-items: center;
    
    p {
      font-size: 1.8rem;
      font-weight: 800;
      color: ${({ theme }) => theme.colors.blackL1};
    }
  `
};
