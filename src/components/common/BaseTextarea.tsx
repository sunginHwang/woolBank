import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

type BaseTextAreaProps = {
  label?: string;
  value: string;
  placeHolder: string;
  onFocusIn?: () => void;
  onFocusOut?: () => void;
  onChange: (e:ChangeEvent<HTMLTextAreaElement>) => void;
}

function BaseTextArea({
  label, value, placeHolder, onChange, onFocusIn,
  onFocusOut
}: BaseTextAreaProps) {
  return (
    <S.BaseTextArea>
      {label && <S.Label>{label}</S.Label>}
      <textarea
        value={value}
        placeholder={placeHolder}
        onFocus={onFocusIn}
        onBlur={onFocusOut}
        onChange={onChange}
      />
    </S.BaseTextArea>
  );
}

const S: {
  BaseTextArea: any;
  Label: any;
} = {
  BaseTextArea: styled.div`
    display: flex;
    margin: 1rem 0;
    height: 100%;
    flex-direction: column;
    background-color: ${props => props.theme.colors.white};
    
    textarea {
      border: none;
      resize: none;
      height: 100%;
    }
  `,
  Label: styled.label`
    font-size: 1.2rem;
    font-weight: 500;
    color: ${(props: any) => (props.focus ? props.theme.colors.navyD1 : props.theme.colors.navyD1)};
    text-align: left;
    margin-bottom: 1.5rem;
  `
};

export default BaseTextArea;
