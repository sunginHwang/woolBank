import React from 'react';

import Item from '@components/account/detail/DepositList/Item';

import withThemeRender from '@support/test/withThemeRender';
import { addComma } from '@support/util/String';
import { parseDate } from '@support/util/date';
import { IDeposit } from '@models/bucketList/IDeposit';

describe('<Item />', () => {
  const deposit: IDeposit = {
    amount: 10000,
    depositDate: new Date('2020-02-02'),
    prevTotalAmount: 100000,
    id: 1,
    userId: 1,
    accountId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const setup = () => {
    const utils = withThemeRender(<Item deposit={deposit} />);

    return {
      ...utils
    };
  };

  it('default 호출시 정상 렌더링이 되어야 한다.', () => {
    const { getByText } = setup();
    expect(getByText(parseDate(deposit.depositDate)));
    expect(getByText(`잔액: ${addComma(deposit.prevTotalAmount)}원`));
    expect(getByText(`${addComma(deposit.amount)}원`));
  });
});
