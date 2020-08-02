import React from 'react';
import AddDepositButton from './AddDepositButton';
import withThemeRender from '../../../support/test/withThemeRender';
import { fireEvent } from '@testing-library/react';

describe('<AddDepositButton />', () => {
  const setup = (onClickButton: () => void) => {
    const utils = withThemeRender(<AddDepositButton onClick={onClickButton} />);
    return {
      ...utils
    };
  };

  it('default 호출시 정상 렌더링이 되어야 한다.', () => {
    const onClickButton = () => console.log('');
    const { getByText } = setup(onClickButton);
    expect(getByText('+'));
  });

  it('퍼센트 부분이 0프로로 정상 렌더링 되어야 한다.', () => {
    let isPlusClick = false;
    const onClickButton = () => isPlusClick = true;

    const { container } = setup(onClickButton);
    if (container.firstChild) {
      fireEvent.click(container.firstChild);
    }

    expect(isPlusClick).toBeTruthy();
  });
});
