import React from 'react';
import styled from 'styled-components';
import { IBottomMenu } from '@models/component/IBottomMenu';

interface IProps {
  menu: IBottomMenu;
  isActive: boolean;
  onMenuSelect: (menuType: string) => void;
}

/**
 * 하단 모달 메뉴
 * @component
 */

function Menu({ menu, isActive, onMenuSelect }: IProps) {

  const onClick = () => {
   onMenuSelect(menu.type);
  };

  return (
    <S.Menu key={menu.type} isActive={isActive} onClick={onClick}>
      {menu.value}
    </S.Menu>
  )
}

export default Menu;

const S = {
  Menu: styled.p<{
    isActive: boolean;
  }>`
    margin: 0 1rem;
    padding: 1.4rem;
    font-size: 1.6rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.blackL1};
    text-align: left;
    background-color: ${({ isActive, theme }) => isActive ? theme.colors.greyL2 : theme.colors.white};
    border-radius: .8rem;
    
    &:last-child {
      margin-bottom: 2.5rem;
      margin-bottom: calc(constant(safe-area-inset-bottom) + 2.5rem);
      margin-bottom: calc(env(safe-area-inset-bottom) + 2.5rem);
    }
  `
};