import React from 'react';
import NavigationBar from '../components/layout/NavigationBar';
import { LayoutRouteProps } from '../routes/Routes';
import SpinnerLoading from '../components/common/SpinnerLoading';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ILayoutLoading } from '../models/layout/ILayoutLoading';
import { INotification } from '../models/layout/INotification';
import Notification from '../components/common/Notification';

function LayoutContainer({ children, useNavBar = true }: LayoutRouteProps) {
  const layoutLoading: ILayoutLoading = useSelector((state: RootState) => state.Layout.loading);
  const notification: INotification = useSelector((state: RootState) => state.Layout.notification);

  return (
    <>
      {children}
      {useNavBar && <NavigationBar />}
      <SpinnerLoading loading={layoutLoading.isLoading} message={layoutLoading.message} />
      {notification.isShow && <Notification visible message={notification.message} />}
    </>
  );
}

export default LayoutContainer;
