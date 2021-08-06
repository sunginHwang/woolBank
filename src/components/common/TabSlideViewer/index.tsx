import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';

import Tabs from '@components/atoms/Tabs';
import { IAssetType } from '@models/component/IAssetType';
import SlideViewerSkeleton from './SlideViewerSkeleton';
import EmptyList from './EmptyList';

import 'swiper/swiper-bundle.min.css';
import '@style/css/tabSlideViewer.css';

const SwipeableViewsStyle = { height: '100%' };

interface IProps {
  tabs: IAssetType[];
  slideViewList: ReactNode[];
  title: string;
}

/**
 * 탭 슬라이드 리스트
 * @component
 */

function TabSlideViewer({ tabs, slideViewList, title }: IProps) {
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
      <S.ListWrapper>
        <SwipeableViews index={tabIndex} onChangeIndex={onSlideTo} style={SwipeableViewsStyle}>
          {slideViewList.map((view, index) => (
            <S.ListContent key={index}>{view}</S.ListContent>
          ))}
        </SwipeableViews>
      </S.ListWrapper>
    </>
  );
}

TabSlideViewer.EmptyList = EmptyList;
TabSlideViewer.Skeleton = SlideViewerSkeleton;

export default TabSlideViewer;

const S = {
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
    
    // 리스트 마지막 요소 네이게이션 영역 패딩 처리
    a:last-child {
      > div {
        margin-bottom: 5.5rem;
        margin-bottom: calc(constant(safe-area-inset-bottom) + 5.5rem);
        margin-bottom: calc(env(safe-area-inset-bottom) + 5.5rem);
      }
    }
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
  `,
  ListWrapper: styled.div`
    height: calc(100vh - 8.8rem);
  `
};
