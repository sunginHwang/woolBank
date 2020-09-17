import React from 'react';

import PageTemplate from '../../components/common/PageTemplate';
import LoginTitle from '../../components/user/LoginTitle';
import SocialLoginContainer from '../../containers/user/SocialLoginContainer';
import LoginContainer from '../../containers/user/LoginContainer';

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
