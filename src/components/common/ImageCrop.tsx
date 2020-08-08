import React, { useRef } from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import HeaderWithBack from './HeaderWithBack';
import IcoCircleCheck from '../icon/IcoCircleCheck';
import Cropper from 'react-cropper';
import './cropper.css';

type ImageCropProps = {
  onBackClick: () => void;
  onCrop: (imageUrl: string) => void;
  url: string;
};

function ImageCrop({
  onBackClick,
  onCrop,
  url
}: ImageCropProps) {
  const onCompleteCrop = () => {
    if (cropper.current) {
      onCrop(cropper.current.getCroppedCanvas().toDataURL());
    }
  }
  const checkEl = <i onClick={onCompleteCrop}><IcoCircleCheck fill={colors.colors.navyD1} /></i>;
  const cropper = useRef<Cropper>(null);

  return (
    <S.ImageCrop>
      <HeaderWithBack title='이미지 편집' right={checkEl} onBackClick={onBackClick} />
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
