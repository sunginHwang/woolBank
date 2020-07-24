import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import PhaseTemplate from '../../common/PhaseTemplate';
import BaseInput from '../../common/BaseInput';
import BaseTextArea from '../../common/BaseTextarea';
import { useToggle } from '../../../support/hooks/useToggle';

function BucketListInfoPhase() {
  const [state, setState] = useState('');
  const [detail, setDetail] = useState('');
  const [showDetailLayer, onShowDetailLayer, offShowDetailLayer] = useToggle(false);

  const onChangeDetail = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetail(e.target.value);
  }

  const isShowDetail = (state.length > 0 && showDetailLayer) || detail.length > 0;

  return (
    <PhaseTemplate
      title='버킷리스트 기본 정보 작성'
      active
      usePadding={false}
      onBackClick={() => console.log('back')}
    >
      <S.AccountInfoAddPhase>
        <S.Content>
          <BaseInput
            label='제목'
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
            <BaseTextArea
              label='좀더 자세한 내용을 알려주세요. :)'
              value={detail}
              placeHolder='목표를 이루기 위한 자세한 사항을 알려주세요. :)'
              onChange={onChangeDetail}
            />
          </S.AddInfo>
        </S.Content>
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
      background: #428bca;
      height: 100%;
  `
};

export default BucketListInfoPhase;
