import React from 'react';
import { IIcon } from '@models/icon/IIcon';

function IcoCircleCheck({ width = 24, height = 24, fill = 'currentColor' }: IIcon) {
  return (
    <svg version='1.1' data-cy='icoCircleCheck' width={width} height={height} viewBox='0 0 24 24'>
      <path
        fill={fill}
        d='M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z'
      />
    </svg>
  );
}

export default IcoCircleCheck;
