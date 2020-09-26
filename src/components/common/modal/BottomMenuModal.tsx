import React from 'react';
import styled from 'styled-components';

import ModalDeem from '@components/common/modal/ModalDeem';

import { IBottomMenu } from '@models/component/IBottomMenu';

export interface BottomMenuModalProps {
  menus: IBottomMenu[];
  title: string;
  visible: boolean;
  oncloseModal: () => void;
  onEditClick: (menuType: string) => void;
};

function BottomMenuModal({
  menus,
  title,
  visible,
  oncloseModal,
  onEditClick
}: BottomMenuModalProps) {
  const renderMenus = menus.map(menu => {
    const onMenuClick = () => onEditClick(menu.type);
    return <p key={menu.type} onClick={onMenuClick}>{menu.value}</p>
  })

  return (
    <ModalDeem visible={visible} onDeemClick={oncloseModal}>
      <S.BottomMenuModal visible={visible}>
        <S.Title>
          <p>{title}</p>
        </S.Title>
        {renderMenus}
      </S.BottomMenuModal>
    </ModalDeem>
  );
}

const S: {
  BottomMenuModal: any;
  Title: any;
} = {
  BottomMenuModal: styled.div`
    position: fixed;
    bottom: ${(props: any) => (props.visible ? '0' : '-30rem')};
    width: 100%;
    transition: all 0.3s ease;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    text-align: center;
    background-color: ${(props) => props.theme.colors.white};
    z-index: ${(props) => props.theme.zIndex.modalDeem + 1};
    box-shadow: 0.1rem 0.3rem 1rem 0.2rem rgba(0, 0, 0, 0.2);

    > p {
      margin-left: 1rem;
      padding: 1.4rem;
      font-size: 1.6rem;
      font-weight: bold;
      color: ${(props) => props.theme.colors.blackL1};
      text-align: left;
    }

    > p:last-child {
      margin-bottom: 2.5rem;
    }
  `,
  Title: styled.div`
    padding: 2rem;
    display: flex;
    justify-content: center;
    p {
      font-weight: bold;

      color: ${(props) => props.theme.colors.blackL1};
    }
  `
};

export default BottomMenuModal;
