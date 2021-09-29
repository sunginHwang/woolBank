import { ThemeProvider } from 'styled-components';

import GlobalStyle from '@style/GlobalStyle';
import theme from '@style/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};

export const decorators = [
  (Story) => {
    return (
      <>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Story />
        </ThemeProvider>
      </>
    );
  }
];
