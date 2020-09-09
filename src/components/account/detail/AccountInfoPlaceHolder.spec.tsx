import React from 'react';
import AccountInfoplaceHolder from './AccountInfoSkeleton';
import withThemeRender from '../../../support/test/withThemeRender';

describe('<AccountInfoplaceHolder />', () => {
  const setup = () => {
    const utils = withThemeRender(<AccountInfoplaceHolder />);
    return {
      ...utils
    };
  };

  it('default 호출시 정상 렌더링이 되어야 한다.', () => {
    const { getByText } = setup();
    expect(getByText('만기예상액 :'));
    expect(getByText('개설일: 0000-00-00'));
    expect(getByText('만기일: 0000-00-00'));
    expect(getByText('만기예상액 :'));
  });

  it('퍼센트 부분이 0프로로 정상 렌더링 되어야 한다.', () => {
    const { getByText } = setup();
    const zeroPercentComponent = getByText('0%');
    expect(zeroPercentComponent);
    expect(zeroPercentComponent).toHaveStyle('left: 0%')
  });
});
