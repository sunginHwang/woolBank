import React from 'react';
import { IIcon } from '@models/icon/IIcon';

function IcoChevronDown({
  width = 24,
  height = 24,
  fill = 'currentColor'
}: IIcon) {
  return (
    <svg
      version='1.1' width={width} height={height}
      viewBox='0 0 24 24'
    >
      <path fill={fill} d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z' />
    </svg>
  );
}

export default IcoChevronDown;
