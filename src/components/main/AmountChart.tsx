import React from 'react';
import styled from 'styled-components';

import { addComma } from '@support/util/String';

export interface AmountChartProps {
  totalPrice: number;
  lastMonthTotalPrice: number;
}

function AmountChart({ totalPrice, lastMonthTotalPrice }: AmountChartProps) {
  const isIncreaseAsset = totalPrice > lastMonthTotalPrice;
  const isEqualAsset = totalPrice === lastMonthTotalPrice;

  return (
    <S.AmountChart>
      {isEqualAsset ? (
        <p>지날달과 동일한 자산입니다.</p>
      ) : (
        <>
          <p>지난달 대비</p>
          <p>
            <strong> {addComma(Math.abs(totalPrice - lastMonthTotalPrice))} 원 </strong>
            {isIncreaseAsset ? '증가' : '감소'}하였습니다.
          </p>
        </>
      )}
    </S.AmountChart>
  );
}

const S: {
  AmountChart: any;
} = {
  AmountChart: styled.div`
    padding: 2rem 0 2rem 0;
    
    > p {
      color: ${({ theme }) => theme.colors.blackL2};
      font-size: 1.6rem;
      line-height: 1.8;
      font-weight: bold;

      > strong {
        color: ${({ theme }) => theme.colors.redL2};
      }
    }
  `
};

export default AmountChart;
