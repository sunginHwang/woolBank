import React from 'react';
import DepositRecordItemPlaceHolder from './DepositRecordItemPlaceHolder';
import withThemeRender from '../../../support/test/withThemeRender';

describe('<DepositRecordItemPlaceHolder />', () => {
  const setup = () => {
    const utils = withThemeRender(<DepositRecordItemPlaceHolder />);
    return {
      ...utils
    };
  };

  it('default 호출시 정상 렌더링이 되어야 한다.', () => {
    const { container } = setup();
    expect(container.firstChild).toHaveStyle('display: flex');
    expect(container.firstChild).toHaveStyle('padding: 2rem 0');
    expect(container.firstChild).toHaveStyle('justify-content: space-between');
    expect(container.firstChild).toHaveStyle('align-items: center');
  });
});
