import React, { useState } from 'react';
import PhaseTemplate from '../components/common/PhaseTemplate';
import styled from 'styled-components';
import WalletInfoAddPhase from '../components/wallet/addPhase/WalletInfoAddPhase';

const SecondPhase = styled.div`
  width: 100%;
  height: 100%;
  background-color: blue;
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
      <PhaseTemplate active={phase >= 1}>
        <WalletInfoAddPhase goNextPage={goNextPage} />
      </PhaseTemplate>
      <PhaseTemplate active={phase >= 2}>
        <SecondPhase>
          <button onClick={goPrevPage}>이전페이지</button>
          <button onClick={goNextPage}>다음페이지</button>
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

export default Wallet;
