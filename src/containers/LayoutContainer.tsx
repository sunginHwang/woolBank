import React from 'react';
import NavigationBar from '../components/layout/NavigationBar';
import { LayoutRouteProps } from '../routes/Routes';

function LayoutContainer({ children, useNavBar = true }: LayoutRouteProps) {
  return (
    <>
      {
        children
      }
      {useNavBar && <NavigationBar />}
    </>
  );
}

export default LayoutContainer;
