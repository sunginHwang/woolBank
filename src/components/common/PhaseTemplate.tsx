import React from 'react';
import styled from 'styled-components';
import PageHeader from '@components/common/PageHeader';

export interface PhaseTemplateProps {
  // 헤더 사용 유무
  active: boolean;
  title: string;
  rightMessage?: string;
  usePadding?: boolean;
  useScroll?: boolean;
  children: React.ReactNode;
  onBackClick: () => void;
}

function PhaseTemplate({
  active,
  title,
  rightMessage,
  usePadding = true,
  useScroll = false,
  children,
  onBackClick
}: PhaseTemplateProps) {
  return (
    <S.PhaseTemplate active={active}>
      {active && <PageHeader title={title} right={rightMessage} onBackClick={onBackClick} />}
      <S.Content useScroll={useScroll} usePadding={usePadding}>
        {children}
      </S.Content>
    </S.PhaseTemplate>
  );
}

export default PhaseTemplate;

type ContentProps = {
  usePadding: boolean;
  useScroll: boolean;
};
const S = {
  PhaseTemplate: styled.div<{ active: boolean }>`
    width: 100%;
    height: calc(100% - 5.5rem);
    position: fixed;
    top: 0;
    right: ${({ active }) => (active ? 0 : '-100%')};
    z-index: ${({ theme }) => theme.zIndex.phase};
    transition: all 0.3s ease 0s;
  `,
  Content: styled.div<ContentProps>`
    padding: ${({ usePadding }) => (usePadding ? '5.5rem 2rem 0 2rem' : '5.5rem 0 0 0')};
    overflow-y: ${({ useScroll }) => (useScroll ? 'scroll' : 'hidden')};
    height: 100%;
    background-color: ${({ theme }) => theme.colors.white};
  `
};
