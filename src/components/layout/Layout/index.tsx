import React from 'react';
import { useSelector } from 'react-redux';

import NavigationBar from '@components/layout/NavigationBar';
import SpinnerLoading from '@components/common/SpinnerLoading';
import Toast from '@components/atoms/Toast/Toast';
import Header from '@components/layout/Header';
import AlertModal from '@components/common/modal/AlertModal';

import { RootState } from '@/store';
import { LayoutRouteProps } from '@/routes';
import { useAlert } from '@support/hooks/useAlert';
import { IToast } from '@models/layout/IToast';
import { ILayoutLoading } from '@models/layout/ILayoutLoading';

interface IProps extends LayoutRouteProps {

}

/**
 * 레이아웃 영역
 * @component
 */

function Layout({ children, useNavBar = true }: IProps) {
  const layoutLoading: ILayoutLoading = useSelector((state: RootState) => state.Layout.loading);
  const toast: IToast = useSelector((state: RootState) => state.Layout.toast);
  const alert: IToast = useSelector((state: RootState) => state.Layout.alert);
  const [, offAlert] = useAlert();

  return (
    <>
      <Header title='뱅킷리스트' description='계좌 정보를 한곳에 모으고 도전하고 싶은 버킷리스트를 만들어봐요~' />
      {children}
      {useNavBar && <NavigationBar />}
      <SpinnerLoading loading={layoutLoading.isLoading} message={layoutLoading.message} />
      <Toast visible={toast.isShow} message={toast.message} />
      <AlertModal isShow={alert.isShow} message={alert.message} onClick={offAlert} />
    </>
  );
}

export default Layout;
