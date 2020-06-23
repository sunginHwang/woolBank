import React from 'react';
import styled from 'styled-components';

type InputPhaseWrapperProps = {
  active: boolean;
  color: string;
  isPrevPhase?: boolean;
  isNextPhase?: boolean;
  goNextPhase?: () => void;
  goPrevPhase?: () => void;
};

// eslint-disable-next-line no-empty-pattern
function InputPhaseWrapper({
  active,
  color,
  isPrevPhase,
  isNextPhase,
  goNextPhase,
  goPrevPhase
}: InputPhaseWrapperProps) {
  return (
    <S.InputPhaseWrapper active={active} color={color}>
      <S.InputPhaseHeader>
        <p>header</p>
      </S.InputPhaseHeader>
      <S.InputPhaseFooter>
        {isPrevPhase && <button onClick={goPrevPhase}>이전페이지</button>}
        {isNextPhase && <button onClick={goNextPhase}>다음페이지</button>}
      </S.InputPhaseFooter>
    </S.InputPhaseWrapper>
  );
}

export default InputPhaseWrapper;

const S: {
  InputPhaseWrapper: any;
  InputPhaseHeader: any;
  InputPhaseFooter: any;
} = {
  InputPhaseWrapper: styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: ${(props: any) => (props.active ? 0 : '-100%')};
    z-index: 200;
    background-color: ${(props: any) => props.color};
    transition: all 0.3s ease 0s;
  `,
  InputPhaseHeader: styled.div`
    display: flex;
    align-items: center;
    padding: 0 2rem;
    height: 5.5rem;
    background-color: ${(props) => props.theme.colors.white};
  `,
  InputPhaseFooter: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 5.5rem;
    background-color: ${(props) => props.theme.colors.white};
  `
};
