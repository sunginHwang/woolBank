import React, { ReactNode, useRef, useState } from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/swiper-bundle.min.css';
import { IAssetType } from '../../models/IAssetType';
import ToggleTab from '../common/ToggleTab';
import ListWrapper from '../common/ListWrapper';

export interface ITabSlideViewerProps {
  tabs: IAssetType[];
  slideViewList: ReactNode[];
}

function TabSlideViewer({ tabs, slideViewList }: ITabSlideViewerProps) {
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
    }
  };

  return (
    <>
      <ToggleTab tabs={tabs} useOutline={false} activeTab={activeTab} onChangeTab={onTabChange} />
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
