import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import palette from '@style/palette';

type SliderSize = 'medium' | 'large';

export interface BaseSliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  dataType?: string;
  size?: SliderSize;
  hoverMessage: string;
  height?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function BaseSlider({
  min,
  max,
  step,
  height = 4,
  dataType = '',
  hoverMessage,
  size = 'large',
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
    const displaySize = size === 'medium' ? 10 : 20;
    const displayPercent = size === 'medium' ? 0.2 : 0.4;
    inputRef.current.style.background = `linear-gradient(90deg, ${palette.mainColor} ${rangePercent}%, rgb(215, 220, 223) ${rangePercent}%)`;
    displayRef.current.style.left = `calc(${rangePercent}%  + ${
      (displaySize - rangePercent * displayPercent) * 0.1
    }rem)`;
  };

  return (
    <S.BaseSlider size={size}>
      <div className='range-value' id='rangeV' ref={displayRef}>
        <span>{hoverMessage}</span>
      </div>
      <input
        ref={inputRef}
        type='range'
        data-type={dataType}
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
  BaseSlider: styled.div<{
    size: SliderSize;
  }>`
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
      background: linear-gradient(90deg, ${({ theme }) => theme.colors.mainColor} 0%, rgb(215, 220, 223) 0);
        
      &:focus{
        outline: none;
      }
      
      &::-webkit-slider-runnable-track {
          width: 100%;
          height: ${({ size }) => (size === 'medium' ? '.2' : '.4')}rem;
          cursor: pointer;
          border-radius: 1.3rem;
      }
      
      &::-webkit-slider-thumb {
          height: ${({ size }) => (size === 'medium' ? '2' : '4')}rem;
          width:  ${({ size }) => (size === 'medium' ? '2' : '4')}rem;
          border: .3rem solid ${({ theme }) => theme.colors.mainColor};
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          -webkit-appearance: none;
          margin-top: ${({ size }) => (size === 'medium' ? '-0.8' : '-1.8')}rem;
      }
    }
    
     >div{
      position: absolute;
      top: ${({ size }) => (size === 'medium' ? '-70%' : '-130%')};
      left: 2rem;
      
      span{
        width:  ${({ size }) => (size === 'medium' ? '6' : '7')}rem;
        height: ${({ size }) => (size === 'medium' ? '3' : '4')}rem;
        line-height: ${({ size }) => (size === 'medium' ? '3' : '4')}rem;;
        text-align: center;
        background: ${({ theme }) => theme.colors.mainColor};
        color: #fff;
        font-size: ${({ size }) => (size === 'medium' ? '1.2' : '1.4')}rem;;
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
      border-top: .5rem solid ${({ theme }) => theme.colors.mainColor};
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
