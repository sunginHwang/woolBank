import React from 'react';
import styled from 'styled-components';
import { addComma } from '@support/util/String';
import LineSeparator from '@components/common/LineSeparator';
import IcoChevronDown from '@components/icon/IcoChevronDown';
/** #506868
 * 이달의 가계부 통계 영역
 * @component
 */

function MonthStatistics() {
  return (
    <div>
      <S.Title>
        <h2>5월 소비 내역</h2>
        <IcoChevronDown />
      </S.Title>
      <S.TotalSection>
        <label>오늘까지 지출 / 수입 내역</label>
        <S.Expenditure>지출 : {addComma(1213131)}원</S.Expenditure>
        <p><span>수입 : </span>{addComma(1213131)}원</p>
      </S.TotalSection>
      <LineSeparator />
    </div>
  );
}

const S = {
  Title: styled.h2`
    display: flex;
    align-items: center;

    > h2 {
      font-size: 2rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.blackL1};
      margin-right: .5rem;
    }
  `,
  TotalSection: styled.section`
    margin-top: 2rem;
    
    > label {
      font-size: 1.2rem;
      color: ${({ theme }) => theme.colors.greyD2};
      margin-bottom: 1.5rem;
    }
    
    p {
     margin-top: .5rem;
     font-weight: bold;
     color: ${({ theme }) => theme.colors.greyD3};

      > span {
        color: #506868;
      } 
    }
  `,
  Expenditure: styled.p`
    color: ${({ theme }) => theme.colors.redL1} !important;
  `
}

export default MonthStatistics;
