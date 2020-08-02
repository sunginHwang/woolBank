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

// todo: initialData 로 받아오기
const categoryList: IBucketListCategory[] = [
  {
    type: 'health',
    name: '건강'
  },
  {
    type: 'work',
    name: '일'
  },
  {
    type: 'learning',
    name: '학습'
  },
  {
    type: 'travel',
    name: '여행'
  }
];

interface BucketListCategoryPhaseProps extends IPhase{
  completeDate: string;
  bucketListCategory: IBucketListCategory;
  onCompletePhaseTwo: (completeDate: string, category: IBucketListCategory) => void;
}

function BucketListCategoryPhase({
  completeDate,
  bucketListCategory,
  isActivePhase,
  onCompletePhaseTwo,
  goPrevPhase,
  goNextPhase
}: BucketListCategoryPhaseProps) {
  const [date, setDate] = useState(completeDate);
  const [category, setCategory] = useState<IBucketListCategory>(bucketListCategory);
  const [showCategoryLayer, onShowCategoryLayer, offShowCategoryLayer] = useToggle(false);
  const [ShowDateModal, onDateModal, offDateModal] = useToggle(false);

  // 다음 입력 단계 검증
  const isValidNextPhase = date.length > 0 && category.type !== '';
  // 카테고리 레이어 팝업 보여주는 조건
  const isShowCategoryInfo = (date.length > 0 && showCategoryLayer) || category.type !== '';

  // 목표일 변경
  const onChangeDate = (date: string) => {
    setDate(parseDate(date));
    offDateModal();
    // 날짜 선택하면 카테고리 레이어 등장 처리
    onShowCategoryLayer();
  };

  // 카테고리 변경
  const onChangeCategory = (category: IBucketListCategory) => {
    setCategory(category);
  };

  // 목표일 초기화
  const onResetDate = () => {
    setDate('');
  };

  // 다음단계 이동
  const onNextPhaseClick = () => {
    if (isValidNextPhase) {
      onCompletePhaseTwo(date, category);
      goNextPhase && goNextPhase();
    }
  }

  return (
    <PhaseTemplate
      title='목표일 설정'
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
            onFocusIn={offShowCategoryLayer}
            onClick={onDateModal}
            onClear={onResetDate}
          />
          <DateModal
            visible={ShowDateModal}
            date={date ? new Date(date) : new Date()}
            oncloseModal={offDateModal}
            onChangeDate={onChangeDate}
          />
          <S.AddInfo show={isShowCategoryInfo}>
            <BucketListCategoryList
              bucketListCategoryList={categoryList}
              selectedCategory={category}
              onChangeCategory={onChangeCategory}
            />
          </S.AddInfo>
        </S.Content>
      </S.BucketListCategoryPhase>
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
  `,
  AddInfo: styled.div`
    top: ${(props:any) => props.show ? 0 : '100%'};
    margin-top: 4rem;
    position: relative;
    transition: all .3s ease-out;
    height: 100%;
  `
};

export default BucketListCategoryPhase;
