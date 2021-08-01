import React from 'react';

import BaseInput from '@components/common/BaseInput';
import BaseButton from '@components/common/BaseButton';
import Index from '@components/user/login/LoginBox';

/**
 * 일반 (id, pwd) 로그인 영역
 * @component
 */

function IdLogin() {
  return (
    <Index title='뱅킷리스트 회원 로그인' type='normal'>
      <BaseInput label='아이디' value='' placeHolder='아이디를 입력해 주세요.' />
      <BaseInput label='암호' value='' placeHolder='암호를 입력해 주세요.' />
      <BaseButton size='full' message='로그인' color='red' />
    </Index>
  );
}

export default IdLogin;
