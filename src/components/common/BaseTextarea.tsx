import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

export interface BaseTextAreaProps {
  label?: string;
  value: string;
  name?: string;
  placeHolder: string;
  onFocusIn?: () => void;
  onFocusOut?: () => void;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

function BaseTextArea({ label, value, name = '', placeHolder, onChange, onFocusIn, onFocusOut }: BaseTextAreaProps) {
  return (
    <S.BaseTextArea>
      {label && <S.Label focus={false}>{label}</S.Label>}
      <textarea
        data-cy={name}
        name={name}
        value={value}
        placeholder={placeHolder}
        onFocus={onFocusIn}
        onBlur={onFocusOut}
        onChange={onChange}
      />
    </S.BaseTextArea>
  );
}

const S = {
  BaseTextArea: styled.div`
    display: flex;
    margin: 1rem 0;
    height: 100%;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.white};

    textarea {
      border: none;
      resize: none;
      height: 100%;
    }
  `,
  Label: styled.label<{ focus: boolean }>`
    font-size: 1.2rem;
    font-weight: 500;
    color: ${({ focus, theme }) => (focus ? theme.colors.mainColor : theme.colors.mainColor)};
    text-align: left;
    margin-bottom: 1.5rem;
  `
};

export default BaseTextArea;
