import React from 'react';
import WalletAddContainer from '../containers/wallet/WalletAddContainer';
import WalletListContainer from '../containers/wallet/WalletListContainer';
import HeaderWithBack from '../components/common/HeaderWithBack';
import { useHistory } from 'react-router';



function Wallet() {
  const history = useHistory();

  return (
    <>
      <HeaderWithBack title='예/적금 리스트' onBackClick={history.goBack}/>
      <WalletListContainer/>
      {/*<WalletAddContainer/>*/}
    </>
  );
}


export default Wallet;
