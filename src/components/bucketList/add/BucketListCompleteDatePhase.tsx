import React, { useState } from 'react';
import styled from 'styled-components';

import LabelText from '@components/common/LabelText';
import PhaseTemplate from '@components/common/PhaseTemplate';
import BaseInput from '@components/common/BaseInput';
import DateModal from '@components/common/modal/DateModal';
import BottomButton from '@components/common/BottomButton';

import { useToggle } from '@support/hooks/useToggle';
import { parseDate } from '@support/util/date';
import { IPhase } from '@models/phase/IPhase';

interface BucketListCompleteDatePhaseProps extends IPhase{
  completeDate: string;
  onCompletePhaseTwo: (completeDate: string) => void;
}

function BucketListCompleteDatePhase({
  completeDate,
  maxPhase = 0,
  isActivePhase,
  onCompletePhaseTwo,
  goPrevPhase,
  goNextPhase
}: BucketListCompleteDatePhaseProps) {
  const [date, setDate] = useState(completeDate);
  const [ShowDateModal, onDateModal, offDateModal] = useToggle(false);

  // 다음 입력 단계 검증
  const isValidNextPhase = date.length > 0;

  /**
   * 목표일 변경
   */
  const onChangeCompleteDate = (completeDate: string) => {
    setDate(parseDate(completeDate));
    offDateModal();
  };

  /**
   * 목표일 초기화
   */
  const onResetCompleteDate = () => {
    setDate('');
  };

  /**
   * 다음단계 이동
   */
  const onNextPhaseClick = () => {
    if (isValidNextPhase) {
      onCompletePhaseTwo(date);
      goNextPhase && goNextPhase();
    }
  }

  return (
    <PhaseTemplate
      title='목표일 설정'
      rightMessage={`2/${maxPhase}`}
      active={isActivePhase}
      usePadding={false}
      onBackClick={goPrevPhase}
    >
      <S.BucketListCompleteDatePhase>
        <S.Content>
          <LabelText>언제 목표를 달성할 계획인지 <br /> 알려주세요.</LabelText>
          <BaseInput
            disable
            placeHolder='클릭하여 날짜를 선택해 주세요.'
            dataType='startDate'
            name='completeDate'
            value={parseDate(date)}
            onClick={onDateModal}
            onClear={onResetCompleteDate}
          />
          <DateModal
            visible={ShowDateModal}
            date={date ? new Date(date) : new Date()}
            oncloseModal={offDateModal}
            onChangeDate={onChangeCompleteDate}
          />
        </S.Content>
      </S.BucketListCompleteDatePhase>
      <BottomButton
        message='다음단계'
        isShow={isActivePhase}
        active={isValidNextPhase}
        onClick={onNextPhaseClick}
      />
    </PhaseTemplate>
  );
}

const S: {
  BucketListCompleteDatePhase: any;
  Content: any;
} = {
  BucketListCompleteDatePhase: styled.div`
    height: calc(100vh - 5.5rem);
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.white};
  `,
  Content: styled.div`
    padding-top: 2rem;
    height: 100%;
  `
};

export default React.memo(BucketListCompleteDatePhase);
