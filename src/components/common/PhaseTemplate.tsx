import React from 'react';
import styled from 'styled-components';
import HeaderWithBack from './HeaderWithBack';

type InputPhaseWrapperProps = {
  // 헤더 사용 유무
  active: boolean;
  title: string;
  rightMessage?: string;
  usePadding?: boolean;
  useScroll?: boolean;
  children: React.ReactNode;
  onBackClick: () => void;
};

function PhaseTemplate({
  active,
  title,
  rightMessage,
  usePadding = true,
  useScroll = false,
  children,
  onBackClick
}: InputPhaseWrapperProps) {
  return (
    <S.PhaseTemplate active={active}>
      {
        active && <HeaderWithBack title={title} right={rightMessage} onBackClick={onBackClick} />
      }
      <S.Content
        useScroll={useScroll}
        usePadding={usePadding}
      >
        {children}
      </S.Content>
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
    z-index: ${(props) => props.theme.zIndex.phase};
    transition: all 0.3s ease 0s;
  `,
  Content: styled.div`
    padding: ${(props: any) =>
    props.usePadding ? '5.5rem 2rem 0 2rem' : '5.5rem 0 0 0'};
    overflow-y: ${(props: any) => props.useScroll ? 'scroll' : 'hidden'};
    height: 100%;
    background-color: ${(props) => props.theme.colors.white};
  `
};
