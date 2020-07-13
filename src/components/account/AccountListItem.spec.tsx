import React from 'react';
import withThemeRender from '../../support/test/withThemeRender';
import { IAccount } from '../../models/IAccount';
import { INSTALLMENT_SAVINGS, TAX_TYPE } from '../../support/constants';
import AccountListItem from './AccountListItem';

describe('<AccountListItem />', () => {
  const setup = () => {
    const account: IAccount = {
      title: '마지막 고정적금',
      amount: 40000000,
      currentAmount: 30000,
      startDate: '2019-02-11',
      endDate: '2024-02-11',
      savingType: INSTALLMENT_SAVINGS[2],
      taxType: TAX_TYPE.NORMAL_TAX,
      rate: 0.3
    };
    const utils = withThemeRender(<AccountListItem account={account} />);
    return {
      ...utils
    };
  };

  it('is exist render asset', () => {
    const { getByText } = setup();
    expect(getByText('만기금액 : 40,000,000원').textContent).toBe('만기금액 : 40,000,000원');
  });

  it('is exist render title', () => {
    const { getByText } = setup();
    expect(getByText('마지막 고정적금').textContent).toBe('마지막 고정적금');
  });
});
