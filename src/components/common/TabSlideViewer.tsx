import React, { ReactNode, useRef, useState } from 'react';
import Swiper from 'react-id-swiper';
import styled from 'styled-components';

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
  const swiperRef = useRef(null);

  /**
   * 탭 변경 이벤트
   **/
  const onTabChange = (tab: IAssetType) => {
    setActiveTab(tab);
    onSlideTo(tabs.findIndex((t) => t.type === tab.type));
  };

  /**
   * 리스트 뷰 스와이프
   **/
  const onSlideTo = (index: number) => {
    if (swiperRef.current === null) {
      return;
    }
    // @ts-ignore
    swiperRef.current.swiper && swiperRef.current.swiper.slideTo(index);
  };

  /**
   * 리스트 뷰 사용자 터치 슬라이드 액션 콜백 이벤트
   **/
  const onListSlideChange = (swiper: any) => {
    setActiveTab(tabs[swiper.realIndex]);
  };

  // 스와이프 파라미터 정의
  const SwiperParams = {
    on: {
      slideChange: onListSlideChange
    },
    containerClass: 'swiper-tab-slide-viewer'
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
        <Swiper ref={swiperRef} {...SwiperParams}>
          {slideViewList.map((view, index) => (
            <div key={index}>{view}</div>
          ))}
        </Swiper>
      </ListWrapper>
    </>
  );
}

export default TabSlideViewer;

const S: {
  FixedHeader: any;
  ListTitle: any;
} = {
  FixedHeader: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: ${({ theme }) => theme.zIndex.header};
    background-color: ${({ theme }) => theme.colors.white};
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
