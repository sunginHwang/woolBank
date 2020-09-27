import React, { useRef } from 'react';
import styled from 'styled-components';
import Cropper from 'react-cropper';

import HeaderWithBack from '@components/common/HeaderWithBack';
import IcoCircleCheck from '@components/icon/IcoCircleCheck';

import colors from '@style/theme';
import './cropper.css';

export interface ImageCropProps {
  url: string;
  onBackClick: () => void;
  onCrop: (imageUrl: string) => void;
}

function ImageCrop({ url, onBackClick, onCrop }: ImageCropProps) {
  const cropper = useRef<Cropper>(null);

  /**
   * 크롭 완료 함수
   */
  const onCompleteCrop = () => {
    if (cropper.current) {
      onCrop(cropper.current.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <S.ImageCrop>
      <HeaderWithBack
        title='이미지 편집'
        right={
          <i onClick={onCompleteCrop}>
            <IcoCircleCheck fill={colors.colors.mainColor} />
          </i>
        }
        onBackClick={onBackClick}
      />
      <S.Content>
        <Cropper
          ref={cropper}
          src={url}
          style={{ height: '400px', width: '100%' }}
          aspectRatio={16 / 9}
          guides={false}
        />
      </S.Content>
    </S.ImageCrop>
  );
}

const S: {
  ImageCrop: any;
  Content: any;
} = {
  ImageCrop: styled.div`
    height: calc(100% + 5.5rem);
    width: 100%;
    background-color: white;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
  `,
  Content: styled.div`
    margin-top: 5.5rem;
  `
};

export default ImageCrop;
