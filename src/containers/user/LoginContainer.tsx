import React from 'react';

import BaseInput from '@components/common/BaseInput';
import BaseButton from '@components/common/BaseButton';
import LoginBox from '@components/user/LoginBox';

function LoginContainer() {
  return (
    <LoginBox title='뱅킷리스트 회원 로그인' type='normal'>
      <BaseInput label='아이디' value='' placeHolder='아이디를 입력해 주세요.' />
      <BaseInput label='암호' value='' placeHolder='암호를 입력해 주세요.' />
      <BaseButton size='full' message='로그인' color='red' />
    </LoginBox>
  );
}

export default LoginContainer;
