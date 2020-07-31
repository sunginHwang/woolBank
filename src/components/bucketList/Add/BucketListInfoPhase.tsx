import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import PhaseTemplate from '../../common/PhaseTemplate';
import BaseInput from '../../common/BaseInput';
import BaseTextArea from '../../common/BaseTextarea';
import { useToggle } from '../../../support/hooks/useToggle';
import BottomButton from '../../common/BottomButton';
import { IPhase } from '../../../models/phase/IPhase';
import LabelText from '../../common/LabelText';
import SubLabelText from '../../common/SubLabelText';

interface BucketListInfoPhaseProps extends IPhase{
  title: string;
  description: string;
  onCompletePhaseOne: (title: string, description: string) => void;
}

function BucketListInfoPhase({
  title,
  description,
  onCompletePhaseOne,
  isActivePhase,
  goPrevPhase,
  goNextPhase
}: BucketListInfoPhaseProps) {
  const [state, setState] = useState(title);
  const [detail, setDetail] = useState(description);
  const [showDetailLayer, onShowDetailLayer, offShowDetailLayer] = useToggle(false);

  useEffect(() => {
    setState(title);
    setDetail(description);
  }, [title, description])

  const onChangeDetail = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetail(e.target.value);
  }

  const onCompletePhaseClick = () => {
    onCompletePhaseOne(state, detail);
    goNextPhase && goNextPhase();
  }

  const isShowDetail = (state.length > 0 && showDetailLayer) || detail.length > 0;
  const isShowCompleteButton = isActivePhase && state.length > 0 && showDetailLayer;
  const isActiveComplete = state.length > 0 && detail.length > 0;
  return (
    <PhaseTemplate
      title='기본 정보 작성'
      rightMessage='1/4'
      active={isActivePhase}
      usePadding={false}
      onBackClick={goPrevPhase}
    >
      <S.AccountInfoAddPhase>
        <S.Content>
          <LabelText>어떤 것을 이루고 싶으신가요?</LabelText>
          <BaseInput
            placeHolder='제목을 입력해 주세요.'
            dataType='text'
            max={30}
            useLengthInfo
            value={state}
            onFocusIn={offShowDetailLayer}
            onFocusOut={onShowDetailLayer}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setState(e.target.value)}
          />
          <S.AddInfo show={isShowDetail}>
            <LabelText>어떻게 목표를 달성할지<br />자세히 적어볼까요?</LabelText>
            <SubLabelText>목표 달성을 구체적으로 작성하면<br />목표를 달성할 가능성이 좀더 높아집니다.</SubLabelText>
            <BaseTextArea
              value={detail}
              placeHolder='내용을 입력하세요.'
              onChange={onChangeDetail}
            />
          </S.AddInfo>
        </S.Content>
        <BottomButton
          message='다음단계'
          isShow={isShowCompleteButton}
          active={isActiveComplete}
          onClick={onCompletePhaseClick}
        />
      </S.AccountInfoAddPhase>
    </PhaseTemplate>
  );
}

const S: {
  AccountInfoAddPhase: any;
  Content: any;
  AddInfo: any;
} = {
  AccountInfoAddPhase: styled.div`
    height: calc(100vh - 5.5rem);
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.colors.white};
  `,
  Content: styled.div`
    padding-top: 2rem;
    height: 80%;
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

export default BucketListInfoPhase;
