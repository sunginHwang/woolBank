import React from 'react';
import styled from 'styled-components';

import ModalDeem from '@components/common/modal/ModalDeem';
import IcoClose from '@components/icon/IcoClose';
import palette from '@style/palette';


export interface NumberInputModalProps {
  visible: boolean;
  oncloseModal: () => void;
}

function NumberInputModal({ visible, oncloseModal }: NumberInputModalProps) {

  const onAddNumberClick = () => {};

  return (
    <ModalDeem visible={visible} onDeemClick={oncloseModal}>
      <S.BottomMenuModal visible={visible}>
        <S.Header>
          <p>고정 지출액 입력</p>
          <IcoClose width={24} height={30} fill={palette.blackL1} />
        </S.Header>
        <S.Content>
          <S.Amount>10,200 원</S.Amount>
          <S.Input>
            <S.InputTable>
              <tbody>
              <tr>
                <S.InputTd data-cy='number_1' onClick={onAddNumberClick}>1</S.InputTd>
                <S.InputTd data-cy='number_2' onClick={onAddNumberClick}>2</S.InputTd>
                <S.InputTd data-cy='number_3' onClick={onAddNumberClick}>3</S.InputTd>
              </tr>
              <tr>
                <S.InputTd data-cy='number_4' onClick={onAddNumberClick}>4</S.InputTd>
                <S.InputTd data-cy='number_5' onClick={onAddNumberClick}>5</S.InputTd>
                <S.InputTd data-cy='number_6' onClick={onAddNumberClick}>6</S.InputTd>
              </tr>
              <tr>
                <S.InputTd data-cy='number_7' onClick={onAddNumberClick}>7</S.InputTd>
                <S.InputTd data-cy='number_8' onClick={onAddNumberClick}>8</S.InputTd>
                <S.InputTd data-cy='number_9' onClick={onAddNumberClick}>9</S.InputTd>
              </tr>
              <tr>
                <S.InputTd data-cy='numberBack'>
                  ←
                </S.InputTd>
                <S.InputTd data-cy='number_0' onClick={onAddNumberClick}>0</S.InputTd>
                <S.InputTd>
                  x
                </S.InputTd>
              </tr>
              </tbody>
            </S.InputTable>
          </S.Input>
        </S.Content>
      </S.BottomMenuModal>
    </ModalDeem>
  );
}

const S: {
  BottomMenuModal: any;
  Title: any;
  InputTable: any;
  InputTd: any;
  Input: any;
  Content: any;
  Header: any;
  Amount: any;
} = {
  Amount: styled.p`
    padding: 0 0 2rem 2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.blackL1};
    text-align: left;
    font-size: 2.8rem;
  `,
  Header: styled.div`
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    
    p {
      font-weight: bold;

      color: ${({ theme }) => theme.colors.blackL1};
    }
  `,
  Content: styled.div`
    margin-bottom: 2.5rem;
  `,
  Input: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  `,
  InputTable: styled.table`
    width: 100%;
    text-align: center;
    flex: 1;
    color: ${({ theme }) => theme.colors.blackL1};
    height: 83%;
  `,
  InputTd: styled.td<{
    isHide: boolean;
  }>`
    font-size: 1.8rem;
    width: 33.33333%;
    padding: 1rem 0;

    &:active {
      border-radius: 1.6rem;
      background-color: ${({ isHide, theme }) => (isHide ? theme.colors.white : theme.colors.greyL3)};
    }
  `,
  BottomMenuModal: styled.div<{
    visible: boolean;
  }>`
    position: fixed;
    bottom: ${({ visible }) => (visible ? '0' : '-30rem')};
    width: 100%;
    transition: all 0.3s ease;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.white};
    z-index: ${({ theme }) => theme.zIndex.modalDeem + 1};
    box-shadow: 0.1rem 0.3rem 1rem 0.2rem rgba(0, 0, 0, 0.2);

    > p {
      margin-left: 1rem;
      padding: 1.4rem;
      font-size: 1.6rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.blackL1};
      text-align: left;
    }

    > p:last-child {
      margin-bottom: 2.5rem;
      margin-bottom: calc(constant(safe-area-inset-bottom) + 2.5rem);
      margin-bottom: calc(env(safe-area-inset-bottom) + 2.5rem);
    }
  `,
  Title: styled.div`
    padding: 2rem;
    display: flex;
    justify-content: center;
    p {
      font-weight: bold;

      color: ${({ theme }) => theme.colors.blackL1};
    }
  `
};

export default NumberInputModal;
