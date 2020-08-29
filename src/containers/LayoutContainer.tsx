import React, { useState } from 'react';
import NavigationBar from '../components/layout/NavigationBar';
import { LayoutRouteProps } from '../routes/Routes';
import SpinnerLoading from '../components/common/SpinnerLoading';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import useFetch from '../support/hooks/useFetch';
import { IAccount } from '../models/IAccount';
import useRequest from '../support/hooks/useRequest';
import { createSocialUser } from '../support/api/userApi';

function LayoutContainer({ children, useNavBar = true }: LayoutRouteProps) {
  // const [data, isLoading, error] = useFetch<IAccount[]>('/accounts');
  const [data, isLoading, error, onRequest] = useRequest(createSocialUser);
  const layoutLoading = useSelector((state: RootState) => state.Layout.loading);

  const onButtonClick = () => {
    const saveInfo = {
      email: 'test@eamil.com',
      imageUrl: 'http://k.kakaocdn.net/dn/ufixE/btqBTym5cx2/KMlit4NyCYQM6GI3dwEiW0/img_110x110.jpg',
      loginType: 'facebook',
      socialId: count
    };
    onRequest(saveInfo);
  };

  return (
    <>
      {
        children
      }
      <button
        style={{ position: 'fixed', top: '20px', left: '20px', backgroundColor: 'red', zIndex: 200 }}
        onClick={onButtonClick}
      >유저 생성
      </button>
      {useNavBar && <NavigationBar />}
      <SpinnerLoading loading={isLoading} message={layoutLoading.message} />
    </>
  );
}

export default LayoutContainer;
