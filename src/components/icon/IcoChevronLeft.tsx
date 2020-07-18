import React from 'react';
import { IIcon } from '../../models/icon/IIcon';

function IcoChevronLeft({
  width = 24,
  height = 24,
  fill = 'currentColor'
}: IIcon) {
  return (
    <svg
      version='1.1' width={width} height={height}
      viewBox='0 0 24 24'
    >
      <path fill={fill} d='M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z' />
    </svg>
  );
}

export default IcoChevronLeft;
