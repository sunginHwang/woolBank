import React, { useState } from 'react';
import PhaseTemplate from '../components/common/PhaseTemplate';
import styled from 'styled-components';
import WalletInfoAddPhase from '../components/wallet/addPhase/WalletInfoAddPhase';
import NumberInput from '../components/common/NumberInput';
import IcoChevronLeft from '../components/icon/IcoChevronLeft';
import theme from '../style/colors';

const SecondPhase = styled.div`
  width: 100%;
  height: 100%;
`;

const ThirdPhase = styled.div`
  width: 100%;
  height: 100%;
  background-color: green;
`;

function Wallet() {
  const [phase, setPhase] = useState(1);

  const goNextPage = () => setPhase(phase + 1);
  const goPrevPage = () => setPhase(phase - 1);

  return (
    <>
      <PhaseTemplate active={phase >= 2}>
        <WalletInfoAddPhase goNextPage={goNextPage} />
      </PhaseTemplate>
      <PhaseTemplate active={phase >= 1}>
        <SecondPhase>
          <S.Header>
            <IcoChevronLeft width={26} height={26} fill={theme.colors.navyD1} />
            <p>예/적금액 작성</p>
          </S.Header>
          <NumberInput />
        </SecondPhase>
      </PhaseTemplate>
      <PhaseTemplate active={phase >= 3}>
        <ThirdPhase>
          <button onClick={goPrevPage}>이전페이지</button>
        </ThirdPhase>
      </PhaseTemplate>
    </>
  );
}

const S: {
  Header: any;
} = {
  Header: styled.div`
    height: 5.5rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 1rem;
    background-color: ${(props) => props.theme.colors.white};
    p {
      font-size: 1.6rem;
      margin-top: 0.4rem;
      color: ${(props) => props.theme.colors.blackL1};
    }
  `
};

export default Wallet;
