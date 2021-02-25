import React from 'react';
import styled from 'styled-components';

/**
 * 컴포넌트 구간 섹션 별 구분 줄
 * @component
 */

function LineSeparator() {
  return <S.LineSeparator />;
}

const S: {
  LineSeparator: any;
} = {
  LineSeparator: styled.div`
    background-color: ${({ theme }) => theme.colors.greyL2};
    height: 0.7rem;

    margin: 2rem -2rem 0 -2rem;
  `
};

export default LineSeparator;
