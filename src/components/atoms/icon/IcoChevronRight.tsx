import React from 'react';
import { IIcon } from '@models/icon/IIcon';

function IcoChevronRight({
  width = 24,
  height = 24,
  fill = 'currentColor'
}: IIcon) {
  return (
    <svg
      version='1.1' width={width} height={height}
      viewBox='0 0 24 24'
    >
      <path
        fill={fill}
        d='M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z'
      />
    </svg>
  );
}

export default IcoChevronRight;
