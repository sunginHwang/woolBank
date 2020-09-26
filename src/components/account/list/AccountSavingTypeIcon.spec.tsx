import React from 'react';
import AccountSavingTypeIcon from '@components/account/list/AccountSavingTypeIcon';
import withThemeRender from '@support/test/withThemeRender';
import { SAVING_TYPE } from '@support/constants';

describe('<AccountSavingTypeIcon />', () => {
  const setup = (savingType: string) => {
    const utils = withThemeRender(<AccountSavingTypeIcon savingType={savingType} />);

    return {
      ...utils
    };
  };

  it('savingType 이 정기적금일 경우 돼지은행 아이콘 표출', () => {
    const { container, getByTestId } = setup(SAVING_TYPE.REGULAR_INSTALLMENT_SAVINGS);
    expect(container.firstChild).toBeTruthy();
    getByTestId('piggyBank')
  });

  it('savingType 이 정기예금일 경우 usd 돈모양 아이콘 표출', () => {
    const { container, getByTestId } = setup(SAVING_TYPE.REGULAR_DEPOSIT);
    expect(container.firstChild).toBeTruthy();
    getByTestId('cashUsd')
  });

  it('savingType 이 자유적금일 경우 원형Usd아이콘 아이콘 표출', () => {
    const { container, getByTestId } = setup(SAVING_TYPE.FREE_INSTALLMENT_SAVINGS);
    expect(container.firstChild).toBeTruthy();
    getByTestId('currencyUsdCircle')
  });
});
