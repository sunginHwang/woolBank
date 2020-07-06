import React, { useState } from 'react';
import styled from 'styled-components';

type BaseSliderProps = {
  min: number;
  max: number;
  step: number;
  value: number;
  height?: number;
  onChange?: React.ChangeEventHandler;
};

function BaseSlider({
                      min,
                      max,
                      step,
                      height = 4,
                      value,
                      onChange
                    }: BaseSliderProps) {
  const [val, setValue] = useState(0);
  const te = (e: any) => setValue(e.target.value);
  const test = `${(20 - (val * .4)) * .1}rem`;
  console.log('rendering');
  return (
    <S.BaseSlider wrapperWidth={`${val}%`} test={test}>
      <div className="range-value" id="rangeV">
        <span>{Number(val * .1).toFixed(2)}%</span>
      </div>
      <input type='range' onChange={te} height={height} value={val} min={min} max={max} step={step}/>
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
    margin: 20px 0;
    width: 100%;
    background: linear-gradient(90deg, ${props => props.theme.colors.navyD1} ${(props: any) => props.wrapperWidth}, rgb(215, 220, 223) ${(props: any) => props.wrapperWidth});
;
    }
    input[type=range]:focus {
        outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: .4rem;
        cursor: pointer;
       // background-color: ${props => props.theme.colors.greyL6};
        border-radius: 1.3rem;
    }
    input[type=range]::-webkit-slider-thumb {
        height: 4rem;
        width: 4rem;
        border: .4rem solid ${props => props.theme.colors.navyD1};
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -1.8rem;
    }
    
    >div{
      position: absolute;
      top: -110%;
      left: calc(${(props: any) => props.wrapperWidth} + ${(props: any) => props.test});
      span{
        width: 7rem;
        height: 4rem;
        line-height: 4rem;
        text-align: center;
        background: ${props => props.theme.colors.navyD1};
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
      border-top: .5rem solid ${props => props.theme.colors.navyD1};
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      margin-top: -1px;
    }
  }
}
  `
};

export default BaseSlider;

/*
HTML CSS JS Result
const
  range = document.getElementById('range'),
  rangeV = document.getElementById('rangeV'),
  setValue = ()=>{
    const
      newValue = Number( (range.value - range.min) * 100 / (range.max - range.min) ),
      newPosition = 10 - (newValue * 0.2);
    rangeV.innerHTML = `<span>${range.value}</span>`;
    rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
  };
document.addEventListener("DOMContentLoaded", setValue);
range.addEventListener('input', setValue);

*/
