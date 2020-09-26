import React from 'react';
import styled from 'styled-components';

import IcoCloseCircle from '@components/icon/IcoCloseCircle';

import colors from '@style/colors';

export interface BucketListPrevImageProps {
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
          <IcoCloseCircle width={30} height={30} fill={colors.colors.mainColor} />
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
    margin: 2rem 0 10rem 0;
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
