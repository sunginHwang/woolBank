import React from 'react';
import NavigationBar from '../components/layout/NavigationBar';
import { LayoutRouteProps } from '../routes/Routes';
import SpinnerLoading from '../components/common/SpinnerLoading';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ILayoutLoading } from '../models/layout/ILayoutLoading';
import { IToast } from '../models/layout/IToast';
import Toast from '../components/common/Toast';

function LayoutContainer({ children, useNavBar = true }: LayoutRouteProps) {
  const layoutLoading: ILayoutLoading = useSelector((state: RootState) => state.Layout.loading);
  const toast: IToast = useSelector((state: RootState) => state.Layout.toast);

  return (
    <>
      {children}
      {useNavBar && <NavigationBar />}
      <SpinnerLoading loading={layoutLoading.isLoading} message={layoutLoading.message} />
      {toast.isShow && <Toast visible message={toast.message} />}
    </>
  );
}

export default LayoutContainer;
