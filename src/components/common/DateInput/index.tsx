import DateModal from '@components/common/modal/DateModal';
import React, { ComponentProps } from 'react';
import BaseInput from '@components/atoms/BaseInput';
import { DATE_FORMAT, parseDate } from '@support/util/date';
import { useToggle } from '@support/hooks/useToggle';
import useMount from '@support/hooks/useMount';

/**
 * 날짜 모달로 입력하는 인풋 (작은사이즈)
 * @component
 */

interface IProps extends ComponentProps<typeof BaseInput>{
  onDateChange: (date: string) => void;
  isInitOpen?: boolean;
  date: string;
}

function DateInput(props: IProps) {
  const { onDateChange, isInitOpen, date, ...rest } = props;
  const [isOpen, onModal, offModal] = useToggle(false);

  // 자동 모달 바로 나오는지 체크
  useMount(() => {
    isInitOpen && onModal();
  });

  const onClear = () => onDateChange('');

  const onChangeDateModal = (date: string) => {
    onDateChange(date);
    offModal();
  };

  return (
    <>
      <BaseInput
        {...rest}
        disable
        value={parseDate(date, DATE_FORMAT.YYYY_MM_DD)}
        onClick={onModal}
        onClear={onClear}
      />
      <DateModal
        visible={isOpen}
        oncloseModal={offModal}
        onChangeDate={onChangeDateModal}
        date={date === '' ? new Date() : new Date(date)}
      />
    </>
  )
}

export default DateInput;
