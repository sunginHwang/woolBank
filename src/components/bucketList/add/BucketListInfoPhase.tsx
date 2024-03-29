import React, { useState } from 'react';
import styled from 'styled-components';

import PhaseTemplate from '@components/common/PhaseTemplate';
import BaseInput from '@components/atoms/BaseInput';
import BaseTextArea from '@components/common/BaseTextarea';
import BottomButton from '@components/common/BottomButton';
import LabelText from '@components/common/LabelText';
import SubLabelText from '@components/common/SubLabelText';

import useInput from '@support/hooks/UseInput';
import { IPhase } from '@models/phase/IPhase';

interface BucketListInfoPhaseProps extends IPhase {
  title: string;
  description: string;
  onCompletePhaseOne: (title: string, description: string) => void;
}

function BucketListInfoPhase({
  title,
  description,
  maxPhase = 0,
  isActivePhase,
  onCompletePhaseOne,
  goPrevPhase,
  goNextPhase
}: BucketListInfoPhaseProps) {
  const [bucketListTitle, onBucketListTitleChange, onResetBucketListTitle] = useInput(title);
  const [detail, setDetail] = useState(description);

  /**
   * 상세 정보 변경
   */
  const onChangeDetail = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetail(e.target.value);
  };

  /**
   * 다음 단계(2/4) 이동
   */
  const onCompletePhaseClick = () => {
    onCompletePhaseOne(bucketListTitle, detail);
    goNextPhase && goNextPhase();
  };

  // 다음단계 이동 활성화 조건
  const isActiveComplete = bucketListTitle.length > 0 && detail.length > 0;

  return (
    <PhaseTemplate
      title='기본 정보 작성'
      rightMessage={`1/${maxPhase}`}
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
            name='title'
            value={bucketListTitle}
            onClear={onResetBucketListTitle}
            onChange={onBucketListTitleChange}
          />
          <S.AddInfo>
            <LabelText>
              어떻게 목표를 달성할지
              <br />
              자세히 적어볼까요?
            </LabelText>
            <SubLabelText>
              목표 달성을 구체적으로 작성하면
              <br />
              목표를 달성할 가능성이 좀더 높아집니다.
            </SubLabelText>
            <BaseTextArea name='detail' value={detail} placeHolder='내용을 입력하세요.' onChange={onChangeDetail} />
          </S.AddInfo>
        </S.Content>
        <BottomButton
          isShow
          message='다음단계'
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
    background-color: ${({ theme }) => theme.colors.white};
  `,
  Content: styled.div`
    padding-top: 2rem;
    height: 80%;
    > div + div {
      margin-top: 4rem;
    }
  `,
  AddInfo: styled.div`
    margin-top: 3rem;
    height: 22rem;
  `
};

export default React.memo(BucketListInfoPhase);
