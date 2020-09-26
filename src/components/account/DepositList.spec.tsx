import React from 'react';

import DepositList from '@components/account/DepositList';

import withThemeRender from '@support/test/withThemeRender';
import { addComma } from '@support/util/String';
import { parseDate } from '@support/util/date';
import { IDeposit } from '@models/IDeposit';

describe('<DepositList />', () => {
  const depositList: IDeposit[] = [{
    amount: 10000,
    depositDate: new Date('2020-02-02'),
    prevTotalAmount: 100000,
    id: 1,
    userId: 1,
    accountId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }];

  const setup = (depositList:IDeposit[] | null, isLoading: boolean) => {
    let utils: any = '';
    if (depositList === null) {
      utils = withThemeRender(<DepositList isLoading={isLoading} />);
    } else {
      utils = withThemeRender(<DepositList depositList={depositList} isLoading={isLoading} />);
    }

    return {
      ...utils
    };
  };

  it('default 호출시 정상 렌더링이 되어야 한다.', () => {
    const { getByText } = setup(depositList, false);
    expect(getByText('입금 내역'));
    expect(getByText('입금 내역'));
    depositList.forEach(deposit => {
      expect(getByText(parseDate(deposit.depositDate)));
      expect(getByText(`잔액: ${addComma(deposit.prevTotalAmount)}원`));
      expect(getByText(`${addComma(deposit.amount)}원`));
    })
  });

  it('loading 호출 시 입금 정보 없어야 한다.', () => {
    const { getByText } = setup(null, true);
    expect(() => getByText('입금 내역')).toThrowError();
  });

  it('입금내역이 없는 경우 입금기록 없는 텍스트만 노출', () => {
    const { getByText } = setup(null, false);
    expect(getByText('입금 기록이 없습니다.'));
  });
});
