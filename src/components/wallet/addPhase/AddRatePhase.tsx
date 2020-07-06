import React from 'react';
import styled from 'styled-components';
import PhaseTemplate from '../../common/PhaseTemplate';
import HeaderWithBack from '../../common/HeaderWithBack';
import BaseSlider from '../../common/BaseSlider';

type AddRatePhaseProps = {
  isActivePhase: boolean;
  rate: number;
  goPrevPhase: () => void;
};

function AddRatePhase({
                        isActivePhase,
                        rate,
                        goPrevPhase
                      }: AddRatePhaseProps) {

  return (
    <PhaseTemplate active={isActivePhase}>
      <HeaderWithBack title='이율 설'
                      onBackClick={goPrevPhase}/>
      <S.AddRatePhase>
        <p>연: {rate} <span>%</span></p>
        <div>
          <BaseSlider min={0} max={100} value={rate} step={1}/>
        </div>
      </S.AddRatePhase>
    </PhaseTemplate>
  );
}

const S: {
  AddRatePhase: any;
} = {
  AddRatePhase: styled.div`
    justify-content: space-between;
    background-color: ${(props) => props.theme.colors.white};
    font-size: 1.8rem;
    height: 100%;
    
    >p {
      font-size: 2.4rem;
      font-weight: bold;
      margin-bottom: 5rem;
      color: ${(props) => props.theme.colors.navyD1};
    }
    
    >div{
      margin: 0 2rem;
    }
  `
};

export default React.memo(AddRatePhase);
