import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

import IcoCloseCircle from '@components/icon/IcoCloseCircle';

export interface BaseInputProps {
  label?: string;
  placeHolder?: string;
  value: string | number;
  name?: string;
  type?: 'text' | 'number' | 'date' | 'range';
  max?: number;
  useLengthInfo?: boolean;
  disable?: boolean;
  dataType?: string;
  onChange?: React.ChangeEventHandler;
  onClear?: (e: React.MouseEvent<HTMLLIElement>) => void;
  onFocusIn?: () => void;
  onFocusOut?: () => void;
  onKeyPressEnter?: () => void;
  onClick?: (e: React.ChangeEvent<HTMLDivElement>) => void;
}

function BaseInput({
  label,
  placeHolder,
  value,
  name,
  type = 'text',
  max = 999,
  useLengthInfo = false,
  dataType = '',
  disable = false,
  onChange,
  onClear,
  onClick,
  onKeyPressEnter,
  onFocusIn,
  onFocusOut
}: BaseInputProps) {
  const isExistInputValue = value !== '';
  const inputRef = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState(false);

  const onFocus = useCallback(() => {
    setFocus(true);
    onFocusIn && onFocusIn();
  }, []);

  const onBlur = useCallback(() => {
    setFocus(false);
    inputRef.current && inputRef.current.blur();
    onFocusOut && onFocusOut();
  }, []);

  const onInputClear = (e: React.MouseEvent<HTMLLIElement>) => {
    onClear && onClear(e);
    e.stopPropagation();
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onBlur();
      onKeyPressEnter && onKeyPressEnter();
    }
  };

  const valueLength = String(value).length;

  return (
    <>
      <S.BaseInput focus={focus} onClick={onClick} data-type={dataType}>
        {label && <label>{label}</label>}
        <input
          data-cy={name}
          ref={inputRef}
          type={type}
          placeholder={placeHolder}
          name={name}
          value={value}
          maxLength={max}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyPress={onKeyPress}
          onChange={onChange}
          disabled={disable}
        />
        {isExistInputValue && (
          <i onClick={onInputClear} data-type={dataType}>
            <IcoCloseCircle width={28} height={32} fill='#958d9e' />
          </i>
        )}
      </S.BaseInput>
      {useLengthInfo && (
        <S.ValueLength>
          {valueLength}/{max}자
        </S.ValueLength>
      )}
    </>
  );
}

const S: {
  BaseInput: any;
  ValueLength: any;
} = {
  BaseInput: styled.div<{
    focus: boolean;
  }>`
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 1rem 0;
    label {
      font-size: 1.2rem;
      font-weight: 500;
      color: ${({ focus, theme }) => (focus ? theme.colors.mainColor : theme.colors.mainColor)};
      text-align: left;
      margin-bottom: 0.5rem;
    }

    input {
      background: transparent;
      border: none;
      border-bottom: 0.1rem solid ${({ focus, theme }) => (focus ? theme.colors.mainColor : theme.colors.greyL1)};
      padding-right: 3rem;
      border-radius: 0;
      height: 4rem;
      color: #27173e;
      font-size: 1.4rem;
    }

    i {
      align-items: center;
      justify-content: center;
      position: absolute;
      right: 0;
      bottom: 0;
      opacity: 0.5;
    }
  `,
  ValueLength: styled.p`
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.greyL1};
  `
};

export default BaseInput;
