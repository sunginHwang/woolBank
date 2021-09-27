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
  children: React.ReactNode;
}
function DayGroup({ days, totalAmount, children }: IProps) {
  return (
    <S.DayGroup>
      <S.DayInfo>
        <S.Day>{days}일</S.Day>
        <S.Price>{addComma(totalAmount)}원</S.Price>
      </S.DayInfo>
      {children}
    </S.DayGroup>
  );
}

const S: {
  DayGroup: any;
  DayInfo: any;
  Day: any;
  Price: any;
} = {
  DayGroup: styled.div`
    & + & {
      margin-top: 3.4rem;
    }
  `,
  DayInfo: styled.div`
    padding-bottom: 1rem;
    border-bottom: .1rem solid ${({ theme }) => theme.colors.greyL2};
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 1rem 0;
    font-size: 1.5rem;
  `,
  Day: styled.span`
    color: ${({ theme }) => theme.colors.greyD2};
  `,
  Price: styled.span`
    font-weight: 600;
  `
}

export default DayGroup;
