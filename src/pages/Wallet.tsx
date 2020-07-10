import React, { useState } from 'react';
import WalletAddContainer from '../containers/wallet/WalletAddContainer';
import WalletListContainer from '../containers/wallet/WalletListContainer';
import { useHistory } from 'react-router';
import IcoCashPlus from '../components/icon/IcoCashPlus';
import colors from '../style/colors';
import PageTemplate from '../components/common/PageTemplate';

function Wallet() {
  const history = useHistory();
  const [phase, setPhase] = useState(0);
  const walletAddIconEl = (
    <div onClick={() => setPhase(1)}>
      <IcoCashPlus width={30} height={30} fill={colors.colors.navyD1} />
    </div>
  );
  return (
    <>
      <PageTemplate
        title='예/적금 리스트'
        onBackClick={history.goBack}
        rightHeader={walletAddIconEl}
      >
        <WalletListContainer />
        {phase >= 1 && (
          <WalletAddContainer phase={phase} onChangePhase={setPhase} />
        )}
      </PageTemplate>
    </>
  );
}

export default Wallet;
