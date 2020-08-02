import React from 'react';
import DepositRecordItem from './DepositRecordItem';
import withThemeRender from '../../support/test/withThemeRender';
import { addComma } from '../../support/util/String';
import { parseDate } from '../../support/util/date';
import { IDepositRecord } from '../../models/IDepositRecord';

describe('<DepositRecordItem />', () => {
  const depositRecord: IDepositRecord = {
    amount: 10000,
    depositDate: new Date('2020-02-02'),
    balance: 100000
  }

  const setup = () => {
    const utils = withThemeRender(<DepositRecordItem depositRecord={depositRecord} />);

    return {
      ...utils
    };
  };

  it('default 호출시 정상 렌더링이 되어야 한다.', () => {
    const { getByText } = setup();
    expect(getByText(parseDate(depositRecord.depositDate)));
    expect(getByText(`잔액: ${addComma(depositRecord.balance)}원`));
    expect(getByText(`${addComma(depositRecord.amount)}원`));
  });
});
