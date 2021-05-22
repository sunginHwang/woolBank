import React from 'react';
import styled from 'styled-components';

import { addComma } from '@support/util/String';

/**
 * 가게부 리스트 날짜 그룹
 * @component
 */

interface IProps {
  days: string;
  totalAmount: number;
}
function DayGroup({ days, totalAmount}: IProps) {

  return (
    <S.DayGroup>
      <S.Day>{days}일</S.Day>
      <S.Price>{addComma(totalAmount)}원</S.Price>
    </S.DayGroup>
  );
}

const S: {
  DayGroup: any;
  Day: any;
  Price: any;
} = {
  DayGroup: styled.div`
    padding-bottom: 1rem;
    border-bottom: .1rem solid ${({ theme }) => theme.colors.greyL2};
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 1rem 0;
  `,
  Day: styled.span`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.greyD2};
  `,
  Price: styled.span`
    font-weight: bold;
  `,
}

export default DayGroup;
