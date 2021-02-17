import React from 'react';
import styled from 'styled-components';

function LineSeparator() {
  return <S.LineSeparator />;
}

const S: {
  LineSeparator: any;
} = {
  LineSeparator: styled.div`
    background-color: ${({ theme }) => theme.colors.greyL2};
    height: .7rem;
    
    margin: 2rem -2rem 0 -2rem;
  `
};

export default LineSeparator;
