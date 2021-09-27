import React from 'react';
import styled from 'styled-components';

export interface EmptyCircleProps {
  size: number;
  imgUrl: string;
  alt: string;
}

function CircleImg({ size, imgUrl, alt = '' }: EmptyCircleProps) {
  return <S.Img size={size} src={imgUrl} alt={alt} />;
}

const S = {
  Img: styled.img<{ size: number }>`
    width: ${(props) => props.size}rem;
    height: ${(props) => props.size}rem;
    border-radius: 50%;
    border: 0.1rem solid ${({ theme }) => theme.colors.greyL2};
  `
};

export default CircleImg;
