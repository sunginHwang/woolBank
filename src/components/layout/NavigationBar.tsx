import React, { useState } from 'react';
import styled from 'styled-components';
import IcoAccountOutline from '../icon/IcoAccountOutline';
import IcoBucketOutline from '../icon/IcoBucketOutline';
import IcoWalletOutline from '../icon/IcoWallet';
import IcoHomeOutline from '../icon/IcoHomeOutline';
import { INavigationBar } from '../../models/layout/INavigationBar';
import { Link, useHistory } from 'react-router-dom';

const navigations: INavigationBar[] = [
  {
    name: '홈',
    value: 'home',
    link: '/',
    icon: <IcoHomeOutline />
  },
  {
    name: '자산관리',
    value: 'accounts',
    link: '/accounts',
    icon: <IcoWalletOutline />
  },
  {
    name: '버킷리스트',
    value: 'bucketList',
    link: '/bucketList',
    icon: <IcoBucketOutline />
  },
  {
    name: '내 정보',
    value: 'me',
    link: '/me',
    icon: <IcoAccountOutline />
  }
];

function NavigationBar() {
  const history = useHistory();

  return (
    <S.NavigationBar>
      {navigations.map((navigation) => {
        return (
          <S.NavigationBarTag
            key={navigation.name}
            active={navigation.link === history.location.pathname}
          >
            <Link to={navigation.link}>
              {navigation.icon}
              <span>{navigation.name}</span>
            </Link>
          </S.NavigationBarTag>
        );
      })}
    </S.NavigationBar>
  );
}

const S: {
  NavigationBar: any;
  NavigationBarTag: any;
} = {
  NavigationBar: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 5.5rem;
    border-top: 0.1rem solid ${(props) => props.theme.colors.greyL6};
    background-color: ${(props) => props.theme.colors.white};
    z-index: ${(props) => props.theme.zIndex.navigationBar};
  `,
  NavigationBarTag: styled.div`
    letter-spacing: 0;
    text-align: center;
    width: 100%;
    height: 56px;
    line-height: 1.2em;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    color: ${(props: any) =>
      props.active ? props.theme.colors.navyD1 : props.theme.colors.blackL1};

    a {
      width: 100%;
      line-height: 1.2rem;
      padding: 0 4px;
      flex-basis: 0;
      flex-grow: 1;
      max-width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: ${(props: any) =>
        props.active ? props.theme.colors.navyD1 : props.theme.colors.greyD2};

      span {
        margin-top: 0.4rem;
        font-size: 1.2rem;
        color: ${(props: any) =>
          props.active ? props.theme.colors.navyD1 : props.theme.colors.greyD2};
      }
    }
  `
};

export default NavigationBar;
