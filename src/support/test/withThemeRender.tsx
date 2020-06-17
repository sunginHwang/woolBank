import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import colors from '../../style/colors';

type t = {
  children: React.FC
}

// @ts-ignore
const withThemeRender = children => {
  return render(
    <ThemeProvider theme={colors}>
      {children}
    </ThemeProvider>
  );
};

export default withThemeRender;