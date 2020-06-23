import React, { useState } from 'react';
import InputPhaseWrapper from '../components/wallet/inputPhase/InputPhaseWrapper';

function Wallet() {
  const [phase, setPhase] = useState(1);

  const goNextPage = () => setPhase(phase + 1);
  const goPrevPage = () => setPhase(phase - 1);
  console.log(phase);
  return (
    <>
      <InputPhaseWrapper
        active={phase >= 1}
        color='red'
        isNextPhase
        goNextPhase={goNextPage}
        goPrevPhase={goPrevPage}
      />
      <InputPhaseWrapper
        active={phase >= 2}
        color='blue'
        isPrevPhase
        isNextPhase
        goNextPhase={goNextPage}
        goPrevPhase={goPrevPage}
      />
      <InputPhaseWrapper
        active={phase >= 3}
        color='black'
        isPrevPhase
        goNextPhase={goNextPage}
        goPrevPhase={goPrevPage}
      />
    </>
  );
}

export default Wallet;
