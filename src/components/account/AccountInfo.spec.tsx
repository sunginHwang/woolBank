import React from 'react';

import AccountInfo from '@components/account/AccountInfo';

import withThemeRender from '@support/test/withThemeRender';
import { INSTALLMENT_SAVINGS, TAX_TYPE } from '@support/constants';
import { addComma } from '@support/util/String';
import { parseDate } from '@support/util/date';
import { IAccount } from '@models/IAccount';

describe('<AccountInfo />', () => {
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

  const setup = () => {
    const utils = withThemeRender(<AccountInfo account={account} />);
    return {
      ...utils
    };
  };

  it('default 호출시 정상 렌더링이 되어야 한다.', () => {
    const { getByText } = setup();
    expect(getByText(account.title));
    expect(getByText(`(${account.savingType.name})`));
    expect(getByText(addComma(account.currentAmount || 0)));
    expect(getByText(`개설일: ${parseDate(account.startDate)}`));
    expect(getByText(`만기일: ${parseDate(account.endDate)}`));
  });
});
