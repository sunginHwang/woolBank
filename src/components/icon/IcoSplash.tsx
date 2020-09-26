import React from 'react';
import { IIcon } from '@models/icon/IIcon';

function IcoSplash({ width = 24, height = 24, fill = 'currentColor' }: IIcon) {
  return (
    <svg version='1.1' width={width} height={height} viewBox='0 0 24 24' data-testid='piggyBank'>
      <path
        fill={fill}
        d='M13 1C14.66 1 16 2.34 16 4S14.66 7 13 7 10 5.66 10 4 11.34 1 13 1M20 14C20 11.64 18.17 9.6 15.5 8.62C15 9.45 14.06 10 13 10C11.76 10 10.69 9.24 10.24 8.17C10 8.2 9.78 8.23 9.57 8.29L7 7V9.32C5.5 10.22 4.45 11.5 4.12 13H2V17H5.08C5.58 17.65 6.23 18.22 7 18.68V22H9V19.56C9.93 19.84 10.94 20 12 20S14.07 19.84 15 19.56V22H17V18.68C18.15 18 19.03 17.06 19.54 16H22V14H20M7 13C6.45 13 6 12.55 6 12S6.45 11 7 11 8 11.45 8 12 7.55 13 7 13Z'
      />
      <animateTransform
        attributeName='transform'
        attributeType='XML'
        type='rotate'
        from='0 12 14'
        to='360 12 14'
        dur='2s'
        repeatCount='indefinite'
      />
    </svg>
  );
}

export default IcoSplash;
