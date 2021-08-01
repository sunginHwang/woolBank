import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import PageTemplate from '@components/layout/PageTemplate';
import Card from '@components/common/Card';
import { RootState } from '@/store';
import config from '@/config';
import { setHeaderAuthToken } from '@support/util/apiCall';
import ConfirmModal from '@components/common/modal/ConfirmModal';
import { useToggle } from '@support/hooks/useToggle';
import Auth from '@store/modules/Auth';
import { useToast } from '@support/hooks/useToast';
import UserCard from '@components/user/mypage/UserCard';

const { ACCESS_TOKEN, REFRESH_TOKEN } = config.auth;

/**
 * 마이페이지
 * @component
 */

function Mypage() {
  const [isOpenLogoutModal, showLogoutModal, hideLogoutModal] = useToggle(false);
  const onToast = useToast();
  const history = useHistory();

  const user = useSelector((root: RootState) => root.Auth.user);
  const dispatch = useDispatch();

  const onLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    dispatch(Auth.actions.logout());
    setHeaderAuthToken({ accessToken: '', refreshToken: '' });
    history.push('/login');
    onToast('로그아웃 되었습니다.');
  };

  const onModifyClick = () => {};

  return (
    <PageTemplate useHeader useBackButton={false} title='나의 뱅킷리스트'>
      <Card title='내 정보'>
        <UserCard name={user.name} userImgUrl={user.imageUrl} onModifyClick={onModifyClick} />
        <Card.DefaultItem title='로그아웃' onClick={showLogoutModal} />
      </Card>
      <ConfirmModal
        visible={isOpenLogoutModal}
        message='정말 로그아웃 하시겠습니까?'
        onConfirmClick={onLogout}
        onCancelClick={hideLogoutModal}
      />
    </PageTemplate>
  );
}

export default Mypage;
