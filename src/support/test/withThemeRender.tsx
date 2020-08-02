import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import colors from '../../style/colors';
import { BrowserRouter } from 'react-router-dom';

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
