import React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

import { INavigationBar } from '@models/layout/INavigationBar';
import { isIOS } from '@support/util/device';
import IcoPig from '@components/atoms/icon/IcoPig';
import IcoAccountOutline from '@components/atoms/icon/IcoAccountOutline';
import IcoBucketOutline from '@components/atoms/icon/IcoBucketOutline';
import IcoWalletOutline from '@components/atoms/icon/IcoWallet';
import IcoHomeOutline from '@components/atoms/icon/IcoHomeOutline';

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
    link: '/bucket-list',
    icon: <IcoBucketOutline />
  },
  {
    name: '가계부',
    value: 'accountBooks',
    link: '/account-books',
    icon: <IcoPig />
  },
  {
    name: '내 정보',
    value: 'me',
    link: '/mypage',
    icon: <IcoAccountOutline />
  }
];

/**
 * 하단 네이게이션바
 * @component
 */

function NavigationBar() {
  const history = useHistory();

  return (
    <S.NavigationBar isExtend={isIOS} data-cy='navigationBar'>
      {navigations.map((navigation) => {
        return (
          <S.NavigationBarTag
            key={navigation.name}
            data-cy={navigation.name}
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

export default NavigationBar;

const S = {
  NavigationBar: styled.div<{ isExtend: boolean }>`
    display: flex;
    align-items: ${({ isExtend }) => (isExtend ? 'flex-start' : 'center')};
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 5.5rem;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    border-top: 0.1rem solid ${({ theme }) => theme.colors.greyL6};
    background-color: ${({ theme }) => theme.colors.white};
    z-index: ${({ theme }) => theme.zIndex.navigationBar};
  `,
  NavigationBarTag: styled.div<{ active: boolean }>`
    letter-spacing: 0;
    text-align: center;
    width: 100%;
    height: 56px;
    line-height: 1.2em;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    color: ${({ active, theme }) => (active ? theme.colors.redL2 : theme.colors.blackL1)};

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
      color: ${({ active, theme }) => (active ? theme.colors.redL2 : theme.colors.greyD2)};

      span {
        margin-top: 0.4rem;
        font-size: 1.2rem;
        color: ${({ active, theme }) => (active ? theme.colors.redL2 : theme.colors.greyD2)};
      }
    }
  `
};
