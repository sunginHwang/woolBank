import React from 'react';
import styled from 'styled-components';

type InputPhaseWrapperProps = {
  active: boolean;
  children: React.ReactNode;
};

function PhaseTemplate({ active, children }: InputPhaseWrapperProps) {
  return <S.PhaseTemplate active={active}>{children}</S.PhaseTemplate>;
}

export default PhaseTemplate;

const S: {
  PhaseTemplate: any;
} = {
  PhaseTemplate: styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: ${(props: any) => (props.active ? 0 : '-100%')};
    z-index: 200;
    transition: all 0.3s ease 0s;
  `
};
