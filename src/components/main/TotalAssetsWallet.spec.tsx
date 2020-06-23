import React from 'react';
import withThemeRender from '../../support/test/withThemeRender';
import TotalAssetsWallet from './TotalAssetsWallet';

describe('<TotalAssetsWallet />', () => {
  const setup = (totalPrice: number, lastMonthTotalPrice: number) => {

    const utils = withThemeRender(<TotalAssetsWallet totalPrice={totalPrice} lastMonthTotalPrice={lastMonthTotalPrice} />);
    return {
      ...utils
    };
  };

  it('render for increase asset', () => {
    const totalPrice = 30000;
    const lastMonthTotalPrice = 20000;
    const { getByText } = setup(totalPrice, lastMonthTotalPrice);
    expect(getByText(`지난달 대비 ${totalPrice - lastMonthTotalPrice}원 자산이 증가 하였습니다.`).textContent)
      .toBe(`지난달 대비 ${totalPrice - lastMonthTotalPrice}원 자산이 증가 하였습니다.`);
  });

  it('render for equal asset', () => {
    const { getByText } = setup(300000, 300000);
    expect(getByText('지난달과 동일한 자산입니다.').textContent).toBe('지난달과 동일한 자산입니다.');
  });

  it('render for decrease asset', () => {
    const totalPrice = 300000;
    const lastMonthTotalPrice = 4300000;
    const { getByText } = setup(totalPrice, lastMonthTotalPrice);
    expect(getByText(`지난달 대비 ${lastMonthTotalPrice - totalPrice}원 자산이 감소 하였습니다.`).textContent)
      .toBe(`지난달 대비 ${lastMonthTotalPrice - totalPrice}원 자산이 감소 하였습니다.`);
  });
});
