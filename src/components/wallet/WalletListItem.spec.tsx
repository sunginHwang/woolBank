import React from 'react';
import { render } from '@testing-library/react';
import WalletListItem from './WalletListItem';
import withThemeRender from '../../support/test/withThemeRender';

describe('<WalletListItem />', () => {
  const setup = () => {
    const utils = withThemeRender(<WalletListItem title='적금' asset={3000}/>);
    return {
      ...utils,
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
