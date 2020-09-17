import React from 'react';
import NavigationBar from '../components/layout/NavigationBar';
import { LayoutRouteProps } from '../routes/Routes';
import SpinnerLoading from '../components/common/SpinnerLoading';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ILayoutLoading } from '../models/layout/ILayoutLoading';
import { IToast } from '../models/layout/IToast';
import AlertModal from '../components/common/modal/AlertModal';
import { useAlert } from '../support/hooks/useAlert';
import Toast from '../components/common/Toast';
import Header from '../components/layout/Header';

function LayoutContainer({ children, useNavBar = true }: LayoutRouteProps) {
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

export default LayoutContainer;
