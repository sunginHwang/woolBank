import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';

type BaseSliderProps = {
  min: number;
  max: number;
  step: number;
  value: number;
  hoverMessage: string;
  height?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function BaseSlider({
  min,
  max,
  step,
  height = 4,
  hoverMessage,
  value,
  onChange
}: BaseSliderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);

  useEffect(() => setSlideStyle(value), []);

  const onSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlideStyle(Number(e.target.value));
    onChange && onChange(e);
  };

  const getRangePercent = (value: number) => ((value - min) * 100) / (max - min);

  const setSlideStyle = (value: number) => {
    if (!inputRef.current || !displayRef.current) {
      return;
    }
    const rangePercent = getRangePercent(value);
    inputRef.current.style.background = `linear-gradient(90deg, ${colors.colors.navyD1} ${rangePercent}%, rgb(215, 220, 223) ${rangePercent}%)`;
    displayRef.current.style.left = `calc(${rangePercent}%  + ${
      (20 - rangePercent * 0.4) * 0.1
    }rem)`;
  };

  return (
    <S.BaseSlider>
      <div className='range-value' id='rangeV' ref={displayRef}>
        <span>{hoverMessage}</span>
      </div>
      <input
        ref={inputRef}
        type='range'
        onChange={onSliderChange}
        height={height}
        value={value}
        min={min}
        max={max}
        step={step}
      />
    </S.BaseSlider>
  );
}

const S: any = {
  BaseSlider: styled.div`
    background: transparent;
    border: none;
    position: relative;
 
    input[type=range] {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      margin: 2rem 0;
      width: 100%;
      outline: none;
      background: linear-gradient(90deg, ${(props) =>
        props.theme.colors.navyD1} 0%, rgb(215, 220, 223) 0);
        
      &:focus{
        outline: none;
      }
      
      &::-webkit-slider-runnable-track {
          width: 100%;
          height: .4rem;
          cursor: pointer;
          border-radius: 1.3rem;
      }
      
      &::-webkit-slider-thumb {
          height: 4rem;
          width: 4rem;
          border: .6rem solid ${(props) => props.theme.colors.navyD1};
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          -webkit-appearance: none;
          margin-top: -1.8rem;
      }
    }
    
     >div{
      position: absolute;
      top: -130%;
      left: 2rem;
      
      span{
        width: 7rem;
        height: 4rem;
        line-height: 4rem;
        text-align: center;
        background: ${(props) => props.theme.colors.navyD1};
        color: #fff;
        font-size: 1.6rem;
        display: block;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        border-radius: 2.3rem;
     }
     
     span:before{
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border-top: .5rem solid ${(props) => props.theme.colors.navyD1};
      border-left: .5rem solid transparent;
      border-right: .5rem solid transparent;
      top: 100%;
      left: 50%;
      margin-left: -.5rem;
      margin-top: -.1rem;
    }
  }
}
  `
};

export default BaseSlider;
