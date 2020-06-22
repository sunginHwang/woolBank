import React from 'react';
import withThemeRender from '../../support/test/withThemeRender';
import NavigationBar from './NavigationBar';
import theme from '../../style/colors';
describe('<NavigationBar />', () => {
  const setup = (activeNavBar: string) => {

    const utils = withThemeRender(<NavigationBar activeNavBar={activeNavBar}/>);
    return {
      ...utils
    };
  };

  it('render for nav menus', () => {
    const { getByText } = setup('home');
    getByText('홈');
    getByText('자산관리');
    getByText('버킷리스트');
    getByText('내 정보');
  });

  it('is active home menu', () => {
    const { getByText } = setup('home');
    const homeEl = getByText('홈');
    const walletEl = getByText('자산관리');
    const bucketListEl = getByText('버킷리스트');
    const meEl = getByText('내 정보');
    expect(homeEl).toHaveStyle(`color: ${theme.colors.navyD1}`);
    expect(walletEl).toHaveStyle(`color: ${theme.colors.greyD2}`);
    expect(bucketListEl).toHaveStyle(`color: ${theme.colors.greyD2}`);
    expect(meEl).toHaveStyle(`color: ${theme.colors.greyD2}`);
  });

  it('is active wallet menu', () => {
    const { getByText } = setup('wallet');
    const homeEl = getByText('홈');
    const walletEl = getByText('자산관리');
    const bucketListEl = getByText('버킷리스트');
    const meEl = getByText('내 정보');
    expect(homeEl).toHaveStyle(`color: ${theme.colors.greyD2}`);
    expect(walletEl).toHaveStyle(`color: ${theme.colors.navyD1}`);
    expect(bucketListEl).toHaveStyle(`color: ${theme.colors.greyD2}`);
    expect(meEl).toHaveStyle(`color: ${theme.colors.greyD2}`);
  });

  it('is active bucketList menu', () => {
    const { getByText } = setup('bucketList');
    const homeEl = getByText('홈');
    const walletEl = getByText('자산관리');
    const bucketListEl = getByText('버킷리스트');
    const meEl = getByText('내 정보');
    expect(homeEl).toHaveStyle(`color: ${theme.colors.greyD2}`);
    expect(walletEl).toHaveStyle(`color: ${theme.colors.greyD2}`);
    expect(bucketListEl).toHaveStyle(`color: ${theme.colors.navyD1}`);
    expect(meEl).toHaveStyle(`color: ${theme.colors.greyD2}`);
  });

  it('is active me menu', () => {
    const { getByText } = setup('me');
    const homeEl = getByText('홈');
    const walletEl = getByText('자산관리');
    const bucketListEl = getByText('버킷리스트');
    const meEl = getByText('내 정보');
    expect(homeEl).toHaveStyle(`color: ${theme.colors.greyD2}`);
    expect(walletEl).toHaveStyle(`color: ${theme.colors.greyD2}`);
    expect(bucketListEl).toHaveStyle(`color: ${theme.colors.greyD2}`);
    expect(meEl).toHaveStyle(`color: ${theme.colors.navyD1}`);
  });

});
