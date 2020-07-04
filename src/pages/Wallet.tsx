import React, { useState } from 'react';
import WalletAddContainer from '../containers/wallet/WalletAddContainer';
import WalletListContainer from '../containers/wallet/WalletListContainer';
import HeaderWithBack from '../components/common/HeaderWithBack';
import { useHistory } from 'react-router';
import IcoCashPlus from '../components/icon/IcoCashPlus';
import colors from '../style/colors';
import NavigationBar from '../components/layout/NavigationBar';


function Wallet() {
  const history = useHistory();
  const [phase, setPhase] = useState(0);
  const walletAddIconEl = <div onClick={() => setPhase(1)}><IcoCashPlus width={30} height={30}
                                                                        fill={colors.colors.navyD1}/></div>;
  return (
    <>
      <HeaderWithBack title='예/적금 리스트'
                      right={walletAddIconEl}
                      onBackClick={history.goBack}
      />
      <WalletListContainer/>
      {phase >= 1 && <WalletAddContainer phase={phase} onChangePhase={setPhase}/>}
      <NavigationBar />
    </>
  );
}


export default Wallet;
