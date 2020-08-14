import React from 'react';
import withThemeRender from '../../support/test/withThemeRender';
import NavigationBar from './NavigationBar';
import theme from '../../style/colors';

describe('<NavigationBar />', () => {
  const setup = () => {
    const utils = withThemeRender(<NavigationBar />);
    return {
      ...utils
    };
  };

  it('컴포넌트 생성시 메뉴 정상적으로 렌더링', () => {
    const { getByText } = setup();
    getByText('홈');
    getByText('자산관리');
    getByText('버킷리스트');
    getByText('내 정보');

    const homeEl = getByText('홈');
    const walletEl = getByText('자산관리');
    const bucketListEl = getByText('버킷리스트');
    const meEl = getByText('내 정보');
    // 홈화면만 활성화
    expect(homeEl).toHaveStyle(`color: ${theme.colors.navyD1}`);
    expect(walletEl).toHaveStyle(`color: ${theme.colors.greyD2}`);
    expect(bucketListEl).toHaveStyle(`color: ${theme.colors.greyD2}`);
    expect(meEl).toHaveStyle(`color: ${theme.colors.greyD2}`);
  });
});
