import React from 'react';
import DepositDate from './DepositDate';
import withThemeRender from '../../../support/test/withThemeRender';

describe('<DepositDate />', () => {
  const setup = (isActive: boolean, onBackClick: () => void) => {
    const utils = withThemeRender(<DepositDate isActive={isActive} onBackClick={onBackClick} />);
    return {
      ...utils
    };
  };

  it('기본 랜더링.', () => {
    const { getByText } = setup(false, () => console.log(''));
    expect(getByText('입금 날짜'));
    expect(getByText('입금액'));
    expect(getByText('이전에 입금하신 날짜와 금액을 입력해주세요.'));
    expect(getByText('입금'));
  });
});
