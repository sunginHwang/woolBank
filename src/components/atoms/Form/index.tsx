import React from 'react';
import styled from 'styled-components';

interface IProps {
  children: React.ReactNode;
}

/**
 * 폼 기본 wrap 영역
 * @component
 */

function Form({ children }: IProps) {
  return <S.Form>{children}</S.Form>
}

const S = {
  Form: styled.div`
    margin-top: 2rem;
    
    > div + div {
      margin-top: 4rem;
    }
  `
}

export default Form;
