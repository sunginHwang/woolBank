import React from 'react';

import SocialLoginContainer from '@containers/user/SocialLoginContainer';
import LoginContainer from '@containers/user/LoginContainer';
import PageTemplate from '@components/layout/PageTemplate';
import LoginTitle from '@components/user/LoginTitle';

function Login() {
  return (
    <PageTemplate useHeader={false}>
      <LoginTitle />
      <LoginContainer />
      <SocialLoginContainer />
    </PageTemplate>
  );
};

export default Login;
