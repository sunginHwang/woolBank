import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import colors from '../../style/colors';

// @ts-ignore
const withThemeRender = (children: React.FC) => {
  return render(
    <ThemeProvider theme={colors}>
      {children}
    </ThemeProvider>
  );
};

export default withThemeRender;
