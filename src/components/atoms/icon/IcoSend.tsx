import React from 'react';
import { IIcon } from '@models/icon/IIcon';

function IcoSend({ width = 24, height = 24, fill = 'currentColor' }: IIcon) {
  return (
    <svg version='1.1' width={width} height={height} viewBox='0 0 24 24'>
      <path
        fill={fill}
        d='M4 6.03L11.5 9.25L4 8.25L4 6.03M11.5 14.75L4 17.97V15.75L11.5 14.75M2 3L2 10L17 12L2 14L2 21L23 12L2 3Z'
      />
    </svg>
  );
}

export default IcoSend;
