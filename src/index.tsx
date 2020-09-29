import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import App from '@/App';
import store from '@/store';
import * as serviceWorker from '@/serviceWorker';
import GlobalStyle from '@style/GlobalStyle';
import theme from '@style/theme';
import ErrorHandler from '@support/context/ErrorHandler';

ReactDOM.render(
  <Provider store={store()}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ErrorHandler>
          <GlobalStyle />
          <App />
        </ErrorHandler>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
