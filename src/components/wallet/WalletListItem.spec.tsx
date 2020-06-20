import React from 'react';
import WalletListItem from './WalletListItem';
import withThemeRender from '../../support/test/withThemeRender';
import { IWallet } from '../../models/IWallet';

describe('<WalletListItem />', () => {
  const setup = () => {
    const wallet: IWallet = {
      title: '적금',
      asset: 3000,
      endAt: '2020-04-03',
      maturityPrice: 50000,
      type: '정기적금'
    };
    const utils = withThemeRender(<WalletListItem wallet={wallet}/>);
    return {
      ...utils
    };
  };

  it('is exist render asset', () => {
    const { getByText } = setup();
    expect(getByText('3000').textContent).toBe('3000');
  });

  it('is exist render title', () => {
    const { getByText } = setup();
    expect(getByText('적금').textContent).toBe('적금');
  });
});
