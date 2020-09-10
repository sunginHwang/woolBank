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

function LayoutContainer({ children, useNavBar = true }: LayoutRouteProps) {
  const layoutLoading: ILayoutLoading = useSelector((state: RootState) => state.Layout.loading);
  const toast: IToast = useSelector((state: RootState) => state.Layout.toast);
  const alert: IToast = useSelector((state: RootState) => state.Layout.alert);
  const [, offAlert] = useAlert();

  return (
    <>
      {children}
      {useNavBar && <NavigationBar />}
      <SpinnerLoading loading={layoutLoading.isLoading} message={layoutLoading.message} />
      <Toast visible={toast.isShow} message={toast.message} />
      <AlertModal isShow={alert.isShow} message={alert.message} onClick={offAlert} />
    </>
  );
}

export default LayoutContainer;
