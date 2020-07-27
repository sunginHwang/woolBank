import React, { useState } from 'react';
import styled from 'styled-components';
import PhaseTemplate from '../../common/PhaseTemplate';
import BaseInput from '../../common/BaseInput';
import { useToggle } from '../../../support/hooks/useToggle';
import { parseDate } from '../../../support/util/date';
import DateModal from '../../common/modal/DateModal';
import BucketListCategoryList from '../BucketListCategoryList';
import BottomButton from '../../common/BottomButton';

type BucketListCategoryPhaseProps = {
  isActivePhase: boolean;
  goNextPhase: () => void;
  goPrevPhase: () => void;
}
function BucketListCategoryPhase({
  isActivePhase,
  goPrevPhase,
  goNextPhase
}: BucketListCategoryPhaseProps) {
  const [completeDate, setCompleteDate] = useState('');
  const [isShowDateModal, onDateModal, offDateModal] = useToggle(false);

  const onChangeDate = (date: string) => {
    setCompleteDate(parseDate(date));
    offDateModal();
  }

  const isActiveNextPhase = completeDate.length > 0;
  return (
    <PhaseTemplate
      title='목표일 설정'
      active={isActivePhase}
      usePadding={false}
      onBackClick={goPrevPhase}
    >
      <S.BucketListCategoryPhase>
        <S.Content>
          <BaseInput
            disable
            label='성취일 설정'
            placeHolder='언제 성취할 계획인지 알려주세요.'
            dataType='startDate'
            value={parseDate(completeDate)}
            onClick={onDateModal}
            onClear={() => setCompleteDate('')}
          />
          <DateModal
            visible={isShowDateModal}
            date={completeDate ? new Date(completeDate) : new Date()}
            oncloseModal={offDateModal}
            onChangeDate={onChangeDate}
          />
          <S.AddInfo show>
            <BucketListCategoryList />
          </S.AddInfo>
        </S.Content>
      </S.BucketListCategoryPhase>
      <BottomButton
        message='다음단계'
        isShow={isActivePhase}
        active={isActiveNextPhase}
        onClick={goNextPhase}
      />
    </PhaseTemplate>
  );
}

const S: {
  BucketListCategoryPhase: any;
  Content: any;
  AddInfo: any;
} = {
  BucketListCategoryPhase: styled.div`
    height: calc(100vh - 5.5rem);
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.colors.white};
  `,
  Content: styled.div`
    padding-top: 2rem;
    height: 100%;
    > div + div {
      margin-top: 4rem;
    }
  `,
  AddInfo: styled.div`
      top: ${(props:any) => props.show ? 0 : '100%'};
      margin-top: 3rem;
      position: relative;
      transition: all .3s ease-out;
      height: 100%;
  `
};

export default BucketListCategoryPhase;
