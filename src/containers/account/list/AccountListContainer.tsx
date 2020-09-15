import React, { useEffect, useRef, useState } from 'react';
import ToggleTab from '../../../components/common/ToggleTab';
import { IAssetType } from '../../../models/IAssetType';
import AccountListItem from '../../../components/account/AccountListItem';
import AccountListItemSkeleton from '../../../components/account/list/AccountListItemSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getAccountListLastUpdatedAt } from '../../../support/api/accountApi';
import { getAccountList } from '../../../store/modules/AccountList';
import { checkNeedReFetch } from '../../../support/util/checkNeedReFetch';
import AddButton from '../../../components/common/AddButton';
import { useHistory } from 'react-router';
import Swiper from 'react-id-swiper';
import 'swiper/swiper-bundle.min.css';
import ListWrapper from '../../../components/common/ListWrapper';

const tabs: IAssetType[] = [
  {
    type: 'progress',
    name: '진행중'
  },
  {
    type: 'complete',
    name: '완료'
  }
];

function AccountListContainer() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const swiperRef = useRef(null);
  const accountList = useSelector((state: RootState) => state.AccountList.accountList);
  const lastUpdatedDate = useSelector((state: RootState) => state.AccountList.lastUpdatedDate);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    onLoadAccountList();
  }, []);

  /**
   * 예적금 등록 페이지 이동
   **/
  const goAccountRegisterPage = () => {
    history.push('/accounts/register');
  };

  /**
   * 예적금 리스트 조회
   **/
  const onLoadAccountList = async () => {
    // 캐싱 날짜 없으면 바로 조회
    const needFetch = await checkNeedReFetch(lastUpdatedDate, getAccountListLastUpdatedAt);
    needFetch && dispatch(getAccountList());
  };

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
      {accountList.loading && [...Array(10)].map((_, key) => <AccountListItemSkeleton key={key} />)}
      {!accountList.loading && (
        <Swiper ref={swiperRef} {...SwiperParams}>
          <ListWrapper>
            {accountList.data
              .filter((account) => !account.isExpiration)
              .map((account, index) => (
                <AccountListItem key={index} account={account} />
              ))}
          </ListWrapper>
          <ListWrapper>
            {accountList.data
              .filter((account) => account.isExpiration)
              .map((account, index) => (
                <AccountListItem key={index} account={account} />
              ))}
          </ListWrapper>
        </Swiper>
      )}
      <AddButton icon='+' onClick={goAccountRegisterPage} />
    </>
  );
}

export default AccountListContainer;
