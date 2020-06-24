import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import IcoCloseCircle from '../icon/IcoCloseCircle';

type BaseInputProps = {
  label: string
  placeHolder?: string;
  value: string;
  name?: string;
  disable?: boolean;
  onChange?: React.ChangeEventHandler;
  onClear?: () => void;
};

function BaseInput({
                     label,
                     placeHolder,
                     value,
                     name,
                     disable = false,
                     onChange,
                     onClear
                   }: BaseInputProps) {
  const isExistInputValue = value !== '';

  const [focus, setFocus] = useState(false);

  const onFocus = useCallback(() => setFocus(true), []);
  const onBlur = useCallback(() => setFocus(false), []);

  return (
    <S.BaseInput focus={focus}>
      <label>{label}</label>
      <input type='text'
             placeholder={placeHolder}
             name={name}
             value={value}
             onFocus={onFocus}
             onBlur={onBlur}
             onChange={onChange}
             disabled={disable}/>
      {isExistInputValue && <i onClick={onClear}><IcoCloseCircle width={28} height={32} fill='#958d9e'/></i>}
    </S.BaseInput>
  );
};

const S: any = {
  BaseInput: styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 1rem 0;
    label {
      font-size: 1.2rem;
      font-weight: 500;
      color: ${(props: any) => props.focus ? props.theme.colors.navyD1 : props.theme.colors.blackL1};
      text-align: left;
    }
    
    input {
      background: transparent;
      border: none;
      border-bottom: ${(props: any) => props.focus ? '.2rem' : '.1rem'} solid ${(props: any) => props.focus ? props.theme.colors.navyD1 : props.theme.colors.blackL1};
      padding-right: 3rem;
      border-radius: 0;
      height: 4rem;
      color: #27173E;
      font-size: 1.5rem;
      
      :focus{
        outline: none;
      }
    }
    
    i{
      align-items: center;
      justify-content: center;
      position: absolute;
      right: 0;
      bottom: 0;
      opacity: .5;
    }
`
};

export default BaseInput;