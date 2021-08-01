import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import SocialLogin from '@components/user/login/SocialLogin';
import IdLogin from '@components/user/login/IdLogin';
import PageTemplate from '@components/layout/PageTemplate';
import LoginTitle from '@components/user/login/LoginTitle';
import { RootState } from '@/store';

function Login() {
  const history = useHistory();
  const userId = useSelector((rootState: RootState) => rootState.Auth.user.id);

  if (userId > 0) {
    history.push('/');
  }

  return (
    <PageTemplate useHeader={false}>
      <LoginTitle />
      <IdLogin />
      <SocialLogin />
    </PageTemplate>
  );
}

export default Login;
