import React from 'react';
import { IIcon } from '@models/icon/IIcon';

function IcoHomeOutline({
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
        d='M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22L12 3Z'
      />
    </svg>
  );
}

export default IcoHomeOutline;
