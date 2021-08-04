import React from 'react';

import { IBottomMenu } from '@models/component/IBottomMenu';
import BottomModal from '@components/common/modal/BottomModal';
import Menu from './Menu';

interface IProps {
  menus: IBottomMenu[];
  activeMenuType?: string;
  title: string;
  visible: boolean;
  oncloseModal: () => void;
  onEditClick: (menuType: string) => void;
}

/**
 * 하단 메뉴 모달
 * @component
 */

function BottomMenuModal(props: IProps) {
  const { menus, title, activeMenuType = '', visible, oncloseModal, onEditClick } = props;

  return (
    <BottomModal title={title} visible={visible} oncloseModal={oncloseModal}>
      {menus.map(menu => {
        const isActive = activeMenuType === menu.type;
        return (
          <Menu
            key={menu.type}
            menu={menu}
            isActive={isActive}
            onMenuSelect={onEditClick}
          />
        );
      })}
    </BottomModal>
  );
}

export default BottomMenuModal;
