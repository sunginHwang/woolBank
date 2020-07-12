import React from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import ModalDeem from '../../common/modal/ModalDeem';
import '../../../style/css/customCalendar.css';

type WalletDateModalProps = {
  visible: boolean;
  oncloseModal: any;
  onChangeDate: (date: string) => void;
  date: Date;
};

function WalletDateModal({
  date,
  visible,
  onChangeDate,
  oncloseModal
}: WalletDateModalProps) {
  return (
    <ModalDeem visible={visible} onDeemClick={oncloseModal}>
      <S.WalletDateModal visible={visible}>
        <Calendar
          value={date}
          showFixedNumberOfWeeks={true}
          onChange={(date: Date | Date[]) => onChangeDate(String(date))}
        />
      </S.WalletDateModal>
    </ModalDeem>
  );
}

const S: {
  WalletDateModal: any;
} = {
  WalletDateModal: styled.div`
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

    p {
      height: 15rem;
    }
  `
};

export default WalletDateModal;
