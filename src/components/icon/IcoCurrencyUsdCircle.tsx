import React from 'react';
import { IIcon } from '../../models/icon/IIcon';

function IcoCurrencyUsdCircle({
  width = 24,
  height = 24,
  fill = 'currentColor'
}: IIcon) {
  return (
    <svg version='1.1' width={width} height={height} viewBox='0 0 24 24' data-testid='currencyUsdCircle'>
      <path
        fill={fill}
        d='M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2M15 10H11V11H14A1 1 0 0 1 15 12V15A1 1 0 0 1 14 16H13V17H11V16H9V14H13V13H10A1 1 0 0 1 9 12V9A1 1 0 0 1 10 8H11V7H13V8H15Z'
      />
    </svg>
  );
}

export default IcoCurrencyUsdCircle;
