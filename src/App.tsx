import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Splash from '@components/layout/Splash';

import Auth from '@store/modules/Auth';
import Routes from '@routes/Routes';
import { useToggle } from '@support/hooks/useToggle';
import apiCall, { setHeaderAuthToken } from '@support/util/apiCall';
import { IUser } from '@models/IUser';

function App() {
  const [isShowSplash, showInitLoading, hideInitLoading] = useToggle(true);
  const dispatch = useDispatch();

  /**
   * 첫 진입시 로그인 인증
   */
  useEffect(() => {
    // initLogin();
    hideInitLoading();
  }, []);

  const initLogin = async () => {
    showInitLoading();
    const userInfo = await userLogin();
    setHeaderAuthToken(userInfo.data.data);
    const user: IUser = userInfo.data.data.user;
    await dispatch(Auth.actions.setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      imageUrl: userInfo.data.data.user.profileImg
    }));
    hideInitLoading();
  }

  const userLogin = async () => {
    const saveInfo = {
      email: 'xariby123@nate.com',
      imageUrl: 'http://k.kakaocdn.net/dn/ufixE/btqBTym5cx2/KMlit4NyCYQM6GI3dwEiW0/img_110x110.jpg',
      loginType: 'facebook',
      socialId: '121413'
    };
    return await apiCall.post('/user/login/social', saveInfo);
  };

  // 최초 진입 로그인 체크 지연에 따른 splash 페이징
  if (isShowSplash) {
    return <Splash />
  }

  return (
    <Routes />
  );
}

export default App;
