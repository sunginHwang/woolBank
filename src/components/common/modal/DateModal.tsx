import React from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';

import ModalDeem from '@components/common/modal/ModalDeem';

import '@style/css/customCalendar.css';

export interface WalletDateModalProps {
  visible: boolean;
  oncloseModal: any;
  onChangeDate: (date: string) => void;
  date: Date;
}

function DateModal({ date, visible, onChangeDate, oncloseModal }: WalletDateModalProps) {
  const onChangeCalendar = (date: Date | Date[]) => {
    onChangeDate(String(date));
  };

  return (
    <ModalDeem visible={visible} onDeemClick={oncloseModal}>
      <S.DateModal visible={visible}>
        <Calendar value={date} showFixedNumberOfWeeks onChange={onChangeCalendar} />
      </S.DateModal>
    </ModalDeem>
  );
}

const S = {
  DateModal: styled.div < {
    visible: boolean
  } > `
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
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    
    p {
      height: 15rem;
    }
  `
};

export default DateModal;
