import React from 'react';
import styled from 'styled-components'

type EmptyCircleProps = {
  size: number;
}

function EmptyCircle({ size }: EmptyCircleProps) {
  return <S.EmptyCircle style={{ width: `${size}px`, height: `${size}px` }} />
}

const S: {EmptyCircle : any} = {
  EmptyCircle: styled.div`
    background-color: ${props => props.theme.colors.pinkL1};
    border-radius: 50%;
  `
};

export default EmptyCircle;
