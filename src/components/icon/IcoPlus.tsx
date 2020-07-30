import React from 'react';
import { IIcon } from '../../models/icon/IIcon';

function IcoPlus({ width = 24, height = 24, fill = 'currentColor' }: IIcon) {
  return (
    <svg version='1.1' width={width} height={height} viewBox='0 0 24 24'>
      <path
        fill={fill}
        d='M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z'
      />
    </svg>
  );
}

export default IcoPlus;
