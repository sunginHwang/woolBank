import React from 'react';
import NavigationBar from '../components/layout/NavigationBar';
import { LayoutRouteProps } from '../routes/Routes';
import SpinnerLoading from '../components/common/SpinnerLoading';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import useFetch from '../support/hooks/useFetch';
import { IAccount } from '../models/IAccount';
import useRequest from '../support/hooks/useRequest';
import { createSocialUser } from '../support/api/userApi';
import { ILayoutLoading } from '../models/layout/ILayoutLoading';

function LayoutContainer({ children, useNavBar = true }: LayoutRouteProps) {
  const layoutLoading: ILayoutLoading = useSelector((state: RootState) => state.Layout.loading);

  /*
  request, fetch 훅 예시
  const [data, isLoading, error] = useFetch<IAccount[]>('/accounts');
  const [data, isLoading, error, onRequest] = useRequest(createSocialUser);

  const onButtonClick = () => {
    const saveInfo = {
      email: 'test@eamil.com',
      imageUrl: 'http://k.kakaocdn.net/dn/ufixE/btqBTym5cx2/KMlit4NyCYQM6GI3dwEiW0/img_110x110.jpg',
      loginType: 'facebook',
      socialId: 1
    };
    onRequest(saveInfo);
  };
  */

  return (
    <>
      {
        children
      }
      {useNavBar && <NavigationBar />}
      <SpinnerLoading loading={layoutLoading.isLoading} message={layoutLoading.message} />
    </>
  );
}

export default LayoutContainer;
