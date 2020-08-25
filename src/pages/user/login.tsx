import React from 'react';

import PageTemplate from '../../components/common/PageTemplate';
import LoginTitle from '../../components/user/LoginTitle';
import SocialLoginContainer from '../../containers/user/SocialLoginContainer';

function Login() {
  const responseFacebook = (response: any) => {
    console.log(response);
  }

  return (
    <PageTemplate useHeader={false}>
      <LoginTitle />
      <SocialLoginContainer />
    </PageTemplate>
  );
};

export default Login;
