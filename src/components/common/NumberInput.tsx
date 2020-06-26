import React from 'react';
import styled from 'styled-components/';

type NumberInputProps = {};

function NumberInput({}: NumberInputProps) {
  return (
    <S.NumberInput>
      <S.InputDisplay>
        <p>12,1212원</p>
        <span>총 적금 액 14만 312원</span>
      </S.InputDisplay>
      <S.Input>
        <S.InputTable>
          <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
          <tr>
            <td>4</td>
            <td>5</td>
            <td>6</td>
          </tr>
          <tr>
            <td>7</td>
            <td>8</td>
            <td>9</td>
          </tr>
          <tr>
            <td>←</td>
            <td>0</td>
            <td>X</td>
          </tr>
          </tbody>
        </S.InputTable>
        <S.Complete>작성하기</S.Complete>
      </S.Input>
    </S.NumberInput>
  );
}

const S: {
  NumberInput: any;
  InputTable: any;
  Input: any;
  InputDisplay: any;
  Complete: any;
} = {
  NumberInput: styled.div`
    width: 100%;
    height: calc(100% - 5.5rem);
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.colors.white};
  `,
  Input: styled.div`
    margin-top: auto;
  `,
  InputDisplay: styled.div`
    height: 10rem;
    margin: 4rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      font-size: 4.5rem;
      font-weight: bold;
      color: ${(props) => props.theme.colors.blackL1};
    }
    
    span{
      font-size: 1.4rem;
      color: ${(props) => props.theme.colors.greyL1};
    }
  `,
  InputTable: styled.table`
    width: 100%;
    text-align: center;
    flex: 1;
    color: ${(props) => props.theme.colors.blackL1};
    
    td{
      font-size: 2.8rem;
      height: 10rem;
      width: 33.33333%;
    }
    
    td:active{
      border-radius: 1.6rem;
      background-color: ${(props) => props.theme.colors.greyL3};
    }
  `,
  Complete: styled.button`
    width: calc(100% - 2rem);
    height: 5rem;
    margin: 4rem 1rem 2rem 1rem;
    border-radius: .8rem;
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.navyD1};
    opacity: ${(props: any) => (props.active ? 1 : 0.5)};
  `
};

export default NumberInput;
