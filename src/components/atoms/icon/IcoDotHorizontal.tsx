import React from 'react';
import { IIcon } from '@models/icon/IIcon';

function IcoDowHorizontal({
  width = 24,
  height = 24,
  fill = '#000'
}: IIcon) {
  return (
    <svg
      version='1.1' width={width} height={height} data-cy='icoDotHorizontal'
      viewBox='0 0 24 24'
    >
      <path
        fill={fill}
        d='M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z'
      />
    </svg>
  );
}

export default IcoDowHorizontal;