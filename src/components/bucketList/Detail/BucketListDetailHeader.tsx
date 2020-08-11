import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import useEventListener from '../../../support/hooks/useEventListener';
import { getScrollTop } from '../../../support/util/document';
import theme from '../../../style/colors';
import HeaderWithBack from '../../common/HeaderWithBack';
import Progress from '../../common/Progress';
import IcoDowHorizontal from '../../icon/IcoDotHorizontal';

type BucketListDetailHeaderProps = {
  title: string;
  imgUrl: string;
  remainDay: number;
  remainDayPercent: number
}

function BucketListDetailHeader({
  title,
  imgUrl,
  remainDay,
  remainDayPercent
}: BucketListDetailHeaderProps) {
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
  const optionButtonEl = <i><IcoDowHorizontal fill={headerIconColor} /></i>;

  return (
    <>
      <HeaderWithBack
        iconColor={headerIconColor}
        title={fixedHeaderMsg}
        right={optionButtonEl}
        useSkeleton={!isShowFixedHeader}
        onBackClick={() => console.log('1')}
      />
      <S.ImageInfo ref={imgRef} imgUrl={imgUrl}>
        <div>
          <h2>{title}</h2>
          <Progress
            label={remainDay}
            labelPrefix='D-'
            percent={remainDayPercent}
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
    background-image: url(${(props: any) => props.imgUrl});
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
     }
     
     > div {
      margin-bottom: 5vh;
     }
    }
  `
}
