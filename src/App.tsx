import React, { useEffect } from 'react';
import Routes from './routes/Routes';
import { useToggle } from './support/hooks/useToggle';
import { useDispatch } from 'react-redux';
import Auth from './store/modules/Auth';
import Splash from './components/layout/Splash';

function App() {
  const [isShowSplash, showInitLoading, hideInitLoading] = useToggle(true);
  const dispatch = useDispatch();

  /**
   * 첫 진입시 로그인 인증
   */
  useEffect(() => {
    initLogin();
  }, []);

  const initLogin = async () => {
    showInitLoading();
    await dispatch(Auth.actions.setUser({
      id: 1,
      name: 'sungin',
      email: 'gommpo111@gmail.com',
      imageUrl: ''
    }));
    hideInitLoading();
  }

  // 최초 진입 로그인 체크 지연에 따른 splash 페이징
  if (isShowSplash) {
    return <Splash />
  }

  return (
    <Routes />
  );
}

export default App;
