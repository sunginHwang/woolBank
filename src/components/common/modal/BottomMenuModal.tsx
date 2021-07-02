import React from 'react';
import styled from 'styled-components';

import { IBottomMenu } from '@models/component/IBottomMenu';
import BottomModal from '@components/common/modal/BottomModal';

export interface BottomMenuModalProps<T = string> {
  menus: IBottomMenu[];
  activeMenuType?: T;
  title: string;
  visible: boolean;
  oncloseModal: () => void;
  onEditClick: (menuType: string) => void;
}

function BottomMenuModal({ menus, title, activeMenuType, visible, oncloseModal, onEditClick }: BottomMenuModalProps) {
  const renderMenus = menus.map((menu) => {
    const onMenuClick = () => onEditClick(menu.type);
    const isActive = activeMenuType && activeMenuType === menu.type;
    return (
      <S.Menu key={menu.type} isActive={isActive} onClick={onMenuClick}>
        {menu.value}
      </S.Menu>
    );
  });

  return (
    <BottomModal title={title} visible={visible} oncloseModal={oncloseModal}>
      {renderMenus}
    </BottomModal>
  );
}

const S: {
  Menu: any;
} = {
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

export default BottomMenuModal;
