import React, { useState } from 'react';
import styled from 'styled-components';
import PhaseTemplate from '../../common/PhaseTemplate';
import BaseInput from '../../common/BaseInput';
import { useToggle } from '../../../support/hooks/useToggle';
import { parseDate } from '../../../support/util/date';
import DateModal from '../../common/modal/DateModal';
import BucketListCategoryList from '../BucketListCategoryList';
import BottomButton from '../../common/BottomButton';
import { IPhase } from '../../../models/phase/IPhase';
import { IBucketListCategory } from '../../../models/bucketList/IBucketListCategory';
import LabelText from '../../common/LabelText';

interface BucketListCategoryPhaseProps extends IPhase{
  completeDate: string;
  category: IBucketListCategory;
  onCompletePhaseTwo: (completeDate: string, category: IBucketListCategory) => void;
}

function BucketListCategoryPhase({
  completeDate,
  category,
  isActivePhase,
  onCompletePhaseTwo,
  goPrevPhase,
  goNextPhase
}: BucketListCategoryPhaseProps) {
  const [date, setDate] = useState(completeDate);
  const [isShowDateModal, onDateModal, offDateModal] = useToggle(false);

  const onChangeDate = (date: string) => {
    setDate(parseDate(date));
    offDateModal();
  }

  const isActiveNextPhase = completeDate.length > 0;

  return (
    <PhaseTemplate
      title='목표 상세 설정'
      rightMessage='2/4'
      active={isActivePhase}
      usePadding={false}
      onBackClick={goPrevPhase}
    >
      <S.BucketListCategoryPhase>
        <S.Content>
          <LabelText>언제 목표를 달성할 계획인지 <br /> 알려주세요.</LabelText>
          <BaseInput
            disable
            placeHolder='클릭하여 날짜를 선택해 주세요.'
            dataType='startDate'
            value={parseDate(date)}
            onClick={onDateModal}
            onClear={() => setDate('')}
          />
          <DateModal
            visible={isShowDateModal}
            date={date ? new Date(date) : new Date()}
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
