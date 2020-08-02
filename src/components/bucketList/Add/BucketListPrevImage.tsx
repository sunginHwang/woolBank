import React from 'react';
import styled from 'styled-components';
import colors from '../../../style/colors';
import IcoCloseCircle from '../../icon/IcoCloseCircle';

type BucketListPrevImageProps = {
  previewUrl: string;
  onInitClick: () => void;
}

function BucketListPrevImage({
  previewUrl,
  onInitClick
}: BucketListPrevImageProps) {
  // 이미지가 없다면 미리보기 없음
  if (previewUrl === '') {
    return null;
  }

  return (
    <S.PrevPicture>
      <img src={previewUrl} />
      <S.PrevPictureDeemed>
        <i onClick={onInitClick}>
          <IcoCloseCircle width={30} height={30} fill={colors.colors.navyD1} />
        </i>
      </S.PrevPictureDeemed>
    </S.PrevPicture>
  );
}

const S: {
  PrevPicture: any;
  PrevPictureDeemed: any;
} = {
  PrevPicture: styled.div`
    margin-top: 2rem;
    position: relative;
    > img{
      width: 100%;
      height: auto;
    }
  `,
  PrevPictureDeemed: styled.div`
    position: absolute;
    top: .5rem;
    right: .5rem;
  `
};

export default BucketListPrevImage;
