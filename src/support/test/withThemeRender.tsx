import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import colors from '@style/colors';

// @ts-ignore
const withThemeRender = (children: any) => {
  return render(
    <ThemeProvider theme={colors}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default withThemeRender;
