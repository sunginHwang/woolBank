import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import PageTemplate from '@components/layout/PageTemplate';
import Card from '@components/common/Card';
import CircleImg from '@components/common/CircleImg';
import { RootState } from '@/store';
import config from '@/config';
import { setHeaderAuthToken } from '@support/util/apiCall';
import ConfirmModal from '@components/common/modal/ConfirmModal';
import { useToggle } from '@support/hooks/useToggle';
import Auth from '@/store/modules/Auth';
import { useToast } from '@support/hooks/useToast';

const { ACCESS_TOKEN, REFRESH_TOKEN } = config.auth;

function Menu() {
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

  return (
    <PageTemplate useHeader useBackButton={false} title='더보기'>
      <Card title='내 정보'>
        <S.UserItem>
          <div>
            <CircleImg size={3} imgUrl={user.imageUrl} alt={user.name + '_이미지'} />
            <p>{user.name}</p>
          </div>
          <p>정보수정 하기 ></p>
        </S.UserItem>
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

export default Menu;

const S = {
  UserItem: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    height: 4.8rem;

    div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      p {
        margin-left: 0.6rem;
      }
    }
  `
};
