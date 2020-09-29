import React from 'react';
import { useLocation } from 'react-router-dom';

import PageNotFound from '@pages/error/PageNotFound';

function ErrorHandler({ children }: { children: any }) {
  const location = useLocation();

  console.log(location);

  // @ts-ignore
  switch (location.state ? location.state.errorStatusCode : 0) {
    case 404:
      return <PageNotFound />;
  }

  return children;
}

export default ErrorHandler;
