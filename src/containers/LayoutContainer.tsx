import React from 'react';
import NavigationBar from '../components/layout/NavigationBar';
import { LayoutRouteProps } from '../routes/Routes';
import SpinnerLoading from '../components/common/SpinnerLoading';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

function LayoutContainer({ children, useNavBar = true }: LayoutRouteProps) {
  const layoutLoading = useSelector((state: RootState) => state.Layout.loading);

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
