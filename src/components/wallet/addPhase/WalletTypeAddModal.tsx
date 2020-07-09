import React from 'react';
import styled from 'styled-components';
import ModalDeem from '../../common/modal/ModalDeem';
import { IAssetType } from '../../../models/IAssetType';
import { INSTALLMENT_SAVINGS } from '../../../support/constants';

type WalletTypeAddModalProps = {
  visible: boolean;
  oncloseModal: any;
  onChangeAssetType: (assetType: IAssetType) => void;
};

function WalletTypeAddModal({
  visible,
  oncloseModal,
  onChangeAssetType
}: WalletTypeAddModalProps) {
  return (
    <ModalDeem visible={visible} onDeemClick={oncloseModal}>
      <S.WalletTypeAddModal visible={visible}>
        <S.Title>
          <p>작성하실 예/적금 종류를 선택해주세요.</p>
        </S.Title>
        {INSTALLMENT_SAVINGS.map((installmentSaving) => {
          return (
            <p
              key={installmentSaving.type}
              onClick={() => onChangeAssetType(installmentSaving)}
            >
              {installmentSaving.name}
            </p>
          );
        })}
      </S.WalletTypeAddModal>
    </ModalDeem>
  );
}

const S: {
  WalletTypeAddModal: any;
  Title: any;
} = {
  WalletTypeAddModal: styled.div`
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

    >p {
      margin-left: 1rem;
      padding: 1.4rem;
      font-size: 1.8rem;
      font-weight: 600;
      color: ${(props) => props.theme.colors.blackL1};
      text-align: left;
    }
    
    >p:last-child{
        margin-bottom: 2.5rem;
    }
  `,
  Title: styled.div`
    padding: 2rem;
    display: flex;
    justify-content: center;
      p {
        font-size: 1.6rem;
        font-weight: 600;
       
        color: ${(props) => props.theme.colors.blackL1};
      } 
  `
};

export default WalletTypeAddModal;
