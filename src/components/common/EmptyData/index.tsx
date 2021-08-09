import React from 'react';
import noData from '@image/no_data.svg';
import styled from 'styled-components';

interface IProps {
  msg: string;
}

/**
 * 데이터 없는 경우 노출 영역
 * @component
 */

function EmptyData({ msg }: IProps) {
  return (
    <S.EmptyData>
      <img src={noData} alt='emptyDataImg' />
      <p>{msg}</p>
    </S.EmptyData>
  )
}

export default EmptyData;

const S: {
  EmptyData: any;
} = {
  EmptyData: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
    img {
      width: 60%;
      margin: 4rem 0;
    }

    p {
      padding-left: 2rem;
      padding-right: 2rem;
      text-align: center;
      line-height: 1.5;
      font-size: 1.6rem;
      margin-top: 2rem;
      color: ${({ theme }) => theme.colors.greyD2};
    }
  `
};
