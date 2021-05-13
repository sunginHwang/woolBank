import React, { useEffect, useState } from 'react';
import { format, getHours, getMinutes, set } from 'date-fns';
import Calendar from 'react-calendar';

import TimePicker from './TimePicker';
import BottomModal from '@components/common/modal/BottomModal';
import '@style/css/customCalendar.css';

export interface IProps {
  visible: boolean;
  oncloseModal: any;
  onChangeDateTime: (dateTime: Date) => void;
  date: Date;
}

type modalPhase = 'date' | 'time';

/**
 * 날짜 + 시간 선택 모달
 * @component
 */

function DateTimePickerModal(props: IProps) {
  const { date, visible, onChangeDateTime, oncloseModal } = props;

  const [ dateTime, setDateTime ] = useState<Date>(date);
  const [ modalPhase, setModalPhase ] = useState<modalPhase>('date');

  useEffect(() => {
    setModalPhase('date');
  }, [visible]);

  // 날짜 선택 후 time 피커 활성화
  const onChangeCalendar = (changeDate: Date | Date[]) => {
    setDateTime(set(new Date(String(changeDate)), { hours: getHours(dateTime), minutes: getMinutes(dateTime) }));
    setModalPhase('time');
  };

  // 시간까지 선택하면 모달 종료
  const onChangeTime = (time: string) => {
    onChangeDateTime(new Date(`${format(dateTime, 'yyyy-MM-dd')} ${time}`));
    oncloseModal();
  };

  const time = format(dateTime, 'HH:mm');
  const isDatePhase = modalPhase === 'date';

  return (
    <BottomModal visible={visible} title='시간 선택' oncloseModal={oncloseModal}>
      { isDatePhase && <Calendar value={date} showFixedNumberOfWeeks onChange={onChangeCalendar}/> }
      { !isDatePhase && <TimePicker time={time} onChangeTime={onChangeTime} /> }
    </BottomModal>
  );
}


export default DateTimePickerModal;
