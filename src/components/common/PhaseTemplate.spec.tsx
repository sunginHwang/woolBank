import React from 'react';
import PhaseTemplate from './PhaseTemplate';
import withThemeRender from '../../support/test/withThemeRender';

describe('<PhaseTemplate />', () => {
  it('is rending children PhaseTemplate', () => {
    const { getByText } = withThemeRender(
      <PhaseTemplate active>
        <p>12</p>
      </PhaseTemplate>
    );
    getByText('12')
  });

  it('is active PhaseTemplate', () => {
    const { getByText } = withThemeRender(
      <PhaseTemplate active>
        <p>12</p>
      </PhaseTemplate>
    );
    const templateChildrenEl = getByText('12').closest('div');
    expect(templateChildrenEl).toHaveStyle('right: 0');
  });

  it('is not active PhaseTemplate', () => {
    const { getByText } = withThemeRender(
      <PhaseTemplate active={false}>
        <p>12</p>
      </PhaseTemplate>
    );
    const templateChildrenEl = getByText('12').closest('div');
    expect(templateChildrenEl).toHaveStyle('right: -100%');
  });
});
