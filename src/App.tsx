import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Splash from '@components/layout/Splash';

import Auth from '@store/modules/Auth';
import Routes from '@/routes';
import { useToggle } from '@support/hooks/useToggle';
import { saveToken, setHeaderAuthToken } from '@support/util/apiCall';
import { getInitUserInfo } from '@support/api/userApi';
import config from '@/config';

const { ACCESS_TOKEN } = config.auth;

/**
 * 앱 init 시점
 * @component
 */

function App() {
  const [isShowSplash, , hideInitLoading] = useToggle(true);
  const dispatch = useDispatch();

  /**
   * 첫 진입시 로그인 인증
   */
  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN) === null) {
      hideInitLoading();
    } else {
      initLogin();
    }
  }, []);

  const initLogin = async () => {
    try {
      const res = await getInitUserInfo();
      const { authTokens, userInfo } = res.data.data;

      saveToken(authTokens);
      setHeaderAuthToken(authTokens);

      await dispatch(
        Auth.actions.setUser({
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          imageUrl: userInfo.profileImg
        })
      );
    } catch (e) {
      console.log(e);
    } finally {
      hideInitLoading();
    }
  };

  // 최초 진입 로그인 체크 지연에 따른 splash 페이징
  if (isShowSplash) {
    return <Splash />;
  }

  return <Routes />;
}

export default App;
