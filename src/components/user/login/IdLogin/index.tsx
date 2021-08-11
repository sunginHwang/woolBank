import React from 'react';

import BaseInput from '@components/atoms/BaseInput';
import Button from '@components/atoms/Button';
import LoginBox from '@components/user/login/LoginBox';
import useInput from '@support/hooks/UseInput';

/**
 * 일반 (id, pwd) 로그인 영역
 * @component
 */

function IdLogin() {
  const [id, setId] = useInput('');
  const [pwd, setPwd] = useInput('');

  // Todo email 로그인 처라
  const onLoginClick = () => {
    console.log(id, pwd);
  }

  return (
    <LoginBox title='뱅킷리스트 회원 로그인' type='normal'>
      <BaseInput label='아이디' value={id} onChange={setId} placeHolder='아이디를 입력해 주세요.' />
      <BaseInput label='암호' value={pwd} onChange={setPwd} placeHolder='암호를 입력해 주세요.' />
      <Button size='full' message='로그인' color='red' onClick={onLoginClick} />
    </LoginBox>
  );
}

export default IdLogin;
