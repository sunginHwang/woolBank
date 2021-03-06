import React from 'react';
import { IIcon } from '@models/icon/IIcon';

function IcoCashUsd({ width = 24, height = 24, fill = 'currentColor' }: IIcon) {
  return (
    <svg version='1.1' width={width} height={height} viewBox='0 0 24 24' data-testid='cashUsd'>
      <path
        fill={fill}
        d='M20 4H4C2.89 4 2 4.89 2 6V18C2 19.11 2.9 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.1 4 20 4M15 10H11V11H14C14.55 11 15 11.45 15 12V15C15 15.55 14.55 16 14 16H13V17H11V16H9V14H13V13H10C9.45 13 9 12.55 9 12V9C9 8.45 9.45 8 10 8H11V7H13V8H15V10Z'
      />
    </svg>
  );
}

export default IcoCashUsd;
