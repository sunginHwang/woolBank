import React from 'react';
import WalletList from './WalletList';
import withThemeRender from '../../support/test/withThemeRender';
import { IWallet } from '../../models/IWallet';

const wallets: IWallet[] = [{
  title: '적금1',
  asset: 3000
}, {
  title: '적금2',
  asset: 5000
}];

describe('<WalletList />', () => {
  const setup = () => {
    const utils = withThemeRender(<WalletList wallets={wallets}/>);
    return {
      ...utils
    };
  };

  it('is render walletItems ', () => {
    const { getByText } = setup();
    wallets.map(wallet => {
      getByText(String(wallet.asset));
      getByText(wallet.title);
    });
  });

});
