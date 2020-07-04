import React from 'react';
import WalletAddContainer from '../containers/wallet/WalletAddContainer';
import WalletListContainer from '../containers/wallet/WalletListContainer';
import HeaderWithBack from '../components/common/HeaderWithBack';
import { useHistory } from 'react-router';
import IcoCashPlus from '../components/icon/IcoCashPlus';
import colors from '../style/colors';


function Wallet() {
  const history = useHistory();
  const walletAddIconEl = <div onClick={history.goBack}><IcoCashPlus width={30} height={30} fill={colors.colors.navyD1}/></div>;
  return (
    <>
      <HeaderWithBack title='예/적금 리스트'
                      right={walletAddIconEl}
                      onBackClick={history.goBack}
      />

      <WalletListContainer/>
      {/*<WalletAddContainer/>*/}
    </>
  );
}


export default Wallet;
