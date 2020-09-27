import React, { useState } from 'react';
import { fireEvent } from '@testing-library/react';

import ToggleTab from '@components/common/ToggleTab';

import withThemeRender from '@support/test/withThemeRender';
import colors from '@style/theme';

describe('<ToggleTab />', () => {
  it('두개의 토글버튼이 존재하고 첫번째 버튼이 활성화 되어있는 정상케이스', () => {
    const tabs = ['탭1', '탭2'];
    const { getByText } = withThemeRender(
      <ToggleTab tabs={tabs} activeTab={tabs[0]} onChangeTab={(tab) => console.log(tab)} />
    );
    getByText('탭1');
    getByText('탭2');
    expect(getByText('탭1')).toHaveStyle(`color: ${colors.colors.mainColor}`);
  });

  it('3개의 토글버튼이 존재하고 첫번째 버튼이 활성화 되어있는 정상케이스', () => {
    const tabs = ['탭1', '탭2', '탭3'];
    const { getByText } = withThemeRender(
      <ToggleTab tabs={tabs} activeTab={tabs[0]} onChangeTab={(tab) => console.log(tab)} />
    );
    getByText('탭1');
    getByText('탭2');
    getByText('탭3');
    expect(getByText('탭1')).toHaveStyle(`color: ${colors.colors.mainColor}`);
  });

  it('토글버튼 클릭시 활성화 토글 변경 정상 동작 케이스', () => {
    const tabs = ['탭1', '탭2'];
    let activeTab = tabs[0];
    const setActiveTab = (tab: string) => activeTab = tab;
    const { getByText } = withThemeRender(
      <ToggleTab tabs={tabs} activeTab={activeTab} onChangeTab={setActiveTab} />
    );

    expect(getByText('탭1')).toHaveStyle(`color: ${colors.colors.mainColor}`);
    expect(getByText('탭2')).toHaveStyle(`color: ${colors.colors.blackL1}`);
    // todo 클릭이벤트 안먹음 수정 필요 2번 토글 클릭
    fireEvent.click(getByText('탭2'));

    expect(getByText('탭1')).toHaveStyle(`color: ${colors.colors.mainColor}`);
    expect(getByText('탭2')).toHaveStyle(`color: ${colors.colors.mainColor}`);
  });
});
