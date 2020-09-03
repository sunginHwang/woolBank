import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import useEventListener from '../../../support/hooks/useEventListener';
import { getScrollTop } from '../../../support/util/document';
import theme from '../../../style/colors';
import HeaderWithBack from '../../common/HeaderWithBack';
import Progress from '../../common/Progress';
import IcoDowHorizontal from '../../icon/IcoDotHorizontal';
import { getRemainDatePercentage, remainDays } from '../../../support/util/date';
import PlaceHolderBar from '../../common/PlaceHolderBar';
import { useHistory } from 'react-router';

type BucketListDetailHeaderProps = {
  title: string;
  imgUrl?: string;
  isLoading: boolean;
  createdDate: Date | string;
  completeDate: Date | string;
  onMenuClick: () => void;
}

function BucketListDetailHeader({
  title,
  imgUrl,
  isLoading,
  createdDate,
  completeDate,
  onMenuClick
}: BucketListDetailHeaderProps) {
  const now = new Date();
  const history = useHistory();
  const imgRef = useRef<HTMLDivElement>(null);
  const [isShowFixedHeader, setFixedHeader] = useState(false);

  /**
   * 스크롤 이벤트 (고정 헤더 노출 체크)
   */
  useEventListener('scroll', () => {
    const imgHeight = imgRef.current ? imgRef.current.offsetHeight : 0;
    const isShowHeader = imgHeight - 80 <= getScrollTop();
    isShowFixedHeader !== isShowHeader && setFixedHeader(isShowHeader);
  });

  const fixedHeaderMsg = isShowFixedHeader ? title : '';
  const headerIconColor = isShowFixedHeader ? theme.colors.navyD1 : theme.colors.white;
  // 목표 날짜 까지 남은 기간
  const remainDay = remainDays(now, completeDate);
  // 목표 날짜 까지 이룬 %
  const remainPercent = getRemainDatePercentage(createdDate, completeDate, now);

  return (
    <>
      <HeaderWithBack
        iconColor={headerIconColor}
        title={fixedHeaderMsg}
        right={<i onClick={onMenuClick}><IcoDowHorizontal fill={headerIconColor} /></i>}
        useSkeleton={!isShowFixedHeader}
        onBackClick={() => history.goBack()}
      />
      <S.ImageInfo ref={imgRef} imgUrl={imgUrl}>
        <div>
          {isLoading ? <PlaceHolderBar width='15rem' height='4.4rem' /> : <h2>{title}</h2>}
          <Progress
            label={remainDay}
            labelPrefix='D-'
            percent={remainPercent}
            color={theme.colors.navyD1}
          />
        </div>
      </S.ImageInfo>
    </>
  );
}

export default BucketListDetailHeader;

const S :any = {
  ImageInfo: styled.div`
    background-size: cover;
    background-image: url(${(props: any) => props.imgUrl});
    background-color: ${props => props.theme.colors.greyD2};
    width: 100%;
    height: 40vh;
    > div {
     height: 100%;
     padding: 0 3rem;
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: flex-end;
     
     > h2 {
      font-size: 2.6rem;
      color: ${props => props.theme.colors.white};
      margin-bottom: 8vh;
      text-align: center;
      width: 80%;
     }
     
     > div {
      margin-bottom: 5vh;
     }
    }
  `
}
