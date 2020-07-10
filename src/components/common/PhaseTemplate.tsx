import React from 'react';
import styled from 'styled-components';
import HeaderWithBack from './HeaderWithBack';

type InputPhaseWrapperProps = {
  active: boolean;
  title: string;
  onBackClick: () => void;
  usePadding?: boolean;
  children: React.ReactNode;
};

function PhaseTemplate({
  active,
  title,
  onBackClick,
  usePadding = true,
  children
}: InputPhaseWrapperProps) {
  return (
    <S.PhaseTemplate active={active}>
      <HeaderWithBack title={title} onBackClick={onBackClick} />
      <S.Content usePadding={usePadding}>{children}</S.Content>
    </S.PhaseTemplate>
  );
}

export default PhaseTemplate;

const S: {
  PhaseTemplate: any;
  Content: any;
} = {
  PhaseTemplate: styled.div`
    width: 100%;
    height: calc(100% - 5.5rem);
    position: fixed;
    top: 0;
    right: ${(props: any) => (props.active ? 0 : '-100%')};
    z-index: 200;
    transition: all 0.3s ease 0s;
  `,
  Content: styled.div`
    padding: ${(props: any) =>
      props.usePadding ? '5.5rem 2rem 0 2rem' : '5.5rem 0 0 0'};
    height: 100%;
    background-color: ${(props) => props.theme.colors.white};
  `
};
