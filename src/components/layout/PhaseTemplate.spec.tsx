import React from 'react';
import PhaseTemplate from 'src/components/common/PhaseTemplate';
import withThemeRender from '@support/test/withThemeRender';

describe('<PhaseTemplate />', () => {
  const setup = ({
    active = true,
    title = '',
    rightMessage = '',
    usePadding = true,
    useScroll = false,
    children = <p>12</p>,
    onBackClick = () => {}
  }) => {
    const utils = withThemeRender(<PhaseTemplate active={active} title={title} rightMessage={rightMessage} usePadding={usePadding} useScroll={useScroll} onBackClick={onBackClick}>{children}</PhaseTemplate>);

    return {
      ...utils
    };
  };

  it('기본값 세팅시 자식 렌더링 요소 노출', () => {
    const { getByText } = setup({});
    getByText('12');
  });

  it('title , 우측 메세지 설정시 제대로 헤더 값들 노출', () => {
    const title = '제목';
    const rightMessage = '메세지';
    const { getByText } = setup({ title, rightMessage });
    getByText(title);
    getByText(rightMessage);
  });

  it('active 비활성화 시 헤더 정보 세팅해도 미노출 되어야 함', () => {
    const title = '제목';
    const rightMessage = '메세지';
    const { queryByText } = setup({ title, rightMessage, active: false });
    expect(queryByText(title)).toBeNull();
    expect(queryByText(rightMessage)).toBeNull();
  });
});
