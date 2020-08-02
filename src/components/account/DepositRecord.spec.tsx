import React from 'react';
import DepositRecord from './DepositRecord';
import withThemeRender from '../../support/test/withThemeRender';
import { addComma } from '../../support/util/String';
import { parseDate } from '../../support/util/date';
import { IDepositRecord } from '../../models/IDepositRecord';

describe('<DepositRecord />', () => {
  const depositRecords: IDepositRecord[] = [{
    amount: 10000,
    depositDate: new Date('2020-02-02'),
    balance: 100000
  }];

  const setup = (depositRecords:IDepositRecord[] | null, isLoading: boolean) => {
    let utils: any = '';
    if (depositRecords === null) {
      utils = withThemeRender(<DepositRecord isLoading={isLoading} />);
    } else {
      utils = withThemeRender(<DepositRecord depositRecords={depositRecords} isLoading={isLoading} />);
    }

    return {
      ...utils
    };
  };

  it('default 호출시 정상 렌더링이 되어야 한다.', () => {
    const { getByText } = setup(depositRecords, false);
    expect(getByText('입금 내역'));
    expect(getByText('입금 내역'));
    depositRecords.forEach(depositRecord => {
      expect(getByText(parseDate(depositRecord.depositDate)));
      expect(getByText(`잔액: ${addComma(depositRecord.balance)}원`));
      expect(getByText(`${addComma(depositRecord.amount)}원`));
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
