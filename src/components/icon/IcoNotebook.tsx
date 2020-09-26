import React from 'react';
import { IIcon } from '@models/icon/IIcon';

function IcoNotebook({
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
        d='M3,7V5H5V4C5,2.89 5.9,2 7,2H13V9L15.5,7.5L18,9V2H19C20.05,2 21,2.95 21,4V20C21,21.05 20.05,22 19,22H7C5.95,22 5,21.05 5,20V19H3V17H5V13H3V11H5V7H3M7,11H5V13H7V11M7,7V5H5V7H7M7,19V17H5V19H7Z'
      />
    </svg>
  );
}

export default IcoNotebook;
