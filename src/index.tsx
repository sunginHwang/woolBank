import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import App from '@/App';
import store from '@/store';
import * as serviceWorker from '@/serviceWorker';
import GlobalStyle from '@style/GlobalStyle';
import theme from '@style/theme';
import ErrorHandler from '@pages/error/ErrorHandler';
import { ConfirmProvider } from '@components/common/Confirm/ConfirmService';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 윈도우 포커스 fefetch 기본 제한 처리
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.render(
  <Provider store={store()}>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <GlobalStyle />
            <ErrorHandler>
              <ConfirmProvider>
                <App />
              </ConfirmProvider>
            </ErrorHandler>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
